import Types "../types/analytics";
import OrderTypes "../types/orders";
import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Int "mo:core/Int";

module {
  // Get summary stats from all orders
  public func getSummary(orders : List.List<OrderTypes.Order>) : Types.AnalyticsSummary {
    var totalRevenue : Nat = 0;
    var totalOrders : Nat = 0;
    var confirmed : Nat = 0;
    var delivered : Nat = 0;
    var pending : Nat = 0;

    orders.forEach(func(o : OrderTypes.Order) {
      totalOrders += 1;
      switch (o.paymentStatus) {
        case (#Confirmed) {
          confirmed += 1;
          totalRevenue += o.totalNPR;
        };
        case (#Delivered) {
          delivered += 1;
          totalRevenue += o.totalNPR;
        };
        case (#UnderReview) { pending += 1 };
        case (#Processing) { pending += 1 };
      };
    });

    {
      totalRevenueNPR = totalRevenue;
      totalOrders;
      confirmedOrders = confirmed;
      deliveredOrders = delivered;
      pendingOrders = pending;
    };
  };

  // Get total confirmed + delivered revenue (NPR)
  public func getTotalRevenue(orders : List.List<OrderTypes.Order>) : Nat {
    orders.foldLeft<Nat, OrderTypes.Order>(0, func(acc, o) {
      switch (o.paymentStatus) {
        case (#Confirmed or #Delivered) { acc + o.totalNPR };
        case _ { acc };
      };
    });
  };

  // Convert nanosecond timestamp to "YYYY-MM-DD" string
  func timestampToDate(ts : Int) : Text {
    let seconds : Int = ts / 1_000_000_000;
    let totalDays : Int = seconds / 86400;
    // Compute year
    var y : Int = 1970;
    var d : Int = totalDays;
    var stop = false;
    while (not stop) {
      let daysInYear : Int = if ((y % 4 == 0 and y % 100 != 0) or y % 400 == 0) 366 else 365;
      if (d < daysInYear) {
        stop := true;
      } else {
        d -= daysInYear;
        y += 1;
      };
    };
    // Compute month
    let isLeap = (y % 4 == 0 and y % 100 != 0) or y % 400 == 0;
    let monthDays : [Int] = [31, if isLeap 29 else 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var m : Int = 1;
    var remaining : Int = d;
    var stopMonth = false;
    var idx = 0;
    while (not stopMonth and idx < monthDays.size()) {
      let md = monthDays[idx];
      if (remaining < md) {
        stopMonth := true;
      } else {
        remaining -= md;
        m += 1;
        idx += 1;
      };
    };
    let pad = func(n : Int) : Text {
      if (n < 10) "0" # n.toText() else n.toText();
    };
    y.toText() # "-" # pad(m) # "-" # pad(remaining + 1);
  };

  // Get daily revenue breakdown for last 30 days
  public func getDailyRevenue(orders : List.List<OrderTypes.Order>) : [Types.DailyRevenue] {
    let now = Time.now();
    let thirtyDaysNs : Int = 30 * 24 * 3600 * 1_000_000_000;
    let cutoff = now - thirtyDaysNs;

    let revenueMap = Map.empty<Text, { var rev : Nat; var cnt : Nat }>();

    orders.forEach(func(o : OrderTypes.Order) {
      if (o.timestamp >= cutoff) {
        switch (o.paymentStatus) {
          case (#Confirmed or #Delivered) {
            let dateStr = timestampToDate(o.timestamp);
            switch (revenueMap.get(dateStr)) {
              case (?entry) {
                entry.rev += o.totalNPR;
                entry.cnt += 1;
              };
              case null {
                revenueMap.add(dateStr, { var rev = o.totalNPR; var cnt = 1 });
              };
            };
          };
          case _ {};
        };
      };
    });

    revenueMap.entries()
      .map<(Text, { var rev : Nat; var cnt : Nat }), Types.DailyRevenue>(func((date, entry)) {
        { date; revenueNPR = entry.rev; orderCount = entry.cnt }
      })
      .toArray();
  };

  // Get top products ranked by order count
  public func getTopProducts(orders : List.List<OrderTypes.Order>, limit : Nat) : [Types.TopProduct] {
    let productMap = Map.empty<Nat, { var name : Text; var cnt : Nat; var rev : Nat }>();

    orders.forEach(func(o : OrderTypes.Order) {
      for (item in o.items.vals()) {
        switch (productMap.get(item.productId)) {
          case (?entry) {
            entry.cnt += 1;
            entry.rev += item.priceNPR;
          };
          case null {
            productMap.add(item.productId, { var name = item.productName; var cnt = 1; var rev = item.priceNPR });
          };
        };
      };
    });

    let all = productMap.entries()
      .map(func((pid, entry) : (Nat, { var name : Text; var cnt : Nat; var rev : Nat })) : Types.TopProduct {
        { productId = pid; productName = entry.name; orderCount = entry.cnt; revenueNPR = entry.rev }
      })
      .toArray();

    let sorted = all.sort(func(a : Types.TopProduct, b : Types.TopProduct) : { #less; #equal; #greater } {
      if (a.orderCount > b.orderCount) #less
      else if (a.orderCount < b.orderCount) #greater
      else #equal
    });

    if (sorted.size() <= limit) sorted
    else sorted.sliceToArray(0, limit.toInt());
  };

  // Get payment status distribution counts
  public func getStatusDistribution(orders : List.List<OrderTypes.Order>) : Types.StatusDistribution {
    var processing : Nat = 0;
    var underReview : Nat = 0;
    var confirmed : Nat = 0;
    var delivered : Nat = 0;

    orders.forEach(func(o : OrderTypes.Order) {
      switch (o.paymentStatus) {
        case (#Processing) { processing += 1 };
        case (#UnderReview) { underReview += 1 };
        case (#Confirmed) { confirmed += 1 };
        case (#Delivered) { delivered += 1 };
      };
    });

    { processing; underReview; confirmed; delivered };
  };
};
