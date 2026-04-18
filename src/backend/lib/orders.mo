import Types "../types/orders";
import List "mo:core/List";

module {
  // Generate a unique Order ID string in "GB-<counter>" format
  public func generateOrderId(counter : Nat) : Types.OrderId {
    "GB-" # counter.toText();
  };

  // Convert internal Order to shared OrderInfo
  public func toInfo(order : Types.Order) : Types.OrderInfo {
    {
      orderId = order.orderId;
      userEmail = order.userEmail;
      items = order.items;
      totalNPR = order.totalNPR;
      paymentMethod = order.paymentMethod;
      paymentStatus = order.paymentStatus;
      timestamp = order.timestamp;
    };
  };

  // Create a new order with UnderReview status
  public func create(orderId : Types.OrderId, input : Types.CreateOrderInput, timestamp : Int) : Types.Order {
    {
      orderId;
      userEmail = input.userEmail;
      items = input.items;
      totalNPR = input.totalNPR;
      paymentMethod = input.paymentMethod;
      var paymentStatus = #UnderReview;
      timestamp;
    };
  };

  // Filter orders by criteria
  public func filterOrders(orders : List.List<Types.Order>, filter : Types.OrderFilter) : [Types.OrderInfo] {
    let result = List.empty<Types.OrderInfo>();
    orders.forEach(func(o : Types.Order) {
      let statusMatch = switch (filter.status) {
        case (?s) { o.paymentStatus == s };
        case null { true };
      };
      let emailMatch = switch (filter.email) {
        case (?e) {
          o.userEmail.toLower().contains(#text (e.toLower()))
        };
        case null { true };
      };
      let productMatch = switch (filter.productName) {
        case (?pn) {
          let lower = pn.toLower();
          var found = false;
          for (item in o.items.vals()) {
            if (item.productName.toLower().contains(#text lower)) {
              found := true;
            };
          };
          found
        };
        case null { true };
      };
      if (statusMatch and emailMatch and productMatch) {
        result.add(toInfo(o));
      };
    });
    result.toArray();
  };

  // Get all orders for a specific user email
  public func byEmail(orders : List.List<Types.Order>, email : Text) : [Types.OrderInfo] {
    let lower = email.toLower();
    let result = List.empty<Types.OrderInfo>();
    orders.forEach(func(o : Types.Order) {
      if (o.userEmail.toLower() == lower) {
        result.add(toInfo(o));
      };
    });
    result.toArray();
  };
};
