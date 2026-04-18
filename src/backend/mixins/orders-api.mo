import Types "../types/orders";
import AuthTypes "../types/auth";
import OrderLib "../lib/orders";
import AuthLib "../lib/auth";
import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";

mixin (
  orders : List.List<Types.Order>,
  sessions : Map.Map<AuthTypes.SessionToken, AuthTypes.Session>,
  nextOrderCounter : { var value : Nat },
) {
  // Create a new order (authenticated user)
  public func createOrder(token : AuthTypes.SessionToken, input : Types.CreateOrderInput) : async { #ok : Types.OrderInfo; #err : Text } {
    switch (AuthLib.findSession(sessions, token)) {
      case null { #err("Unauthorized") };
      case (?_session) {
        let counter = nextOrderCounter.value;
        nextOrderCounter.value += 1;
        let orderId = OrderLib.generateOrderId(counter);
        let now = Time.now();
        let order = OrderLib.create(orderId, input, now);
        orders.add(order);
        #ok(OrderLib.toInfo(order));
      };
    };
  };

  // Get orders for the current authenticated user
  public query func getMyOrders(token : AuthTypes.SessionToken) : async { #ok : [Types.OrderInfo]; #err : Text } {
    switch (AuthLib.findSession(sessions, token)) {
      case null { #err("Unauthorized") };
      case (?session) {
        #ok(OrderLib.byEmail(orders, session.email));
      };
    };
  };

  // Get all orders (staff only)
  public query func getAllOrders(token : AuthTypes.SessionToken) : async { #ok : [Types.OrderInfo]; #err : Text } {
    switch (AuthLib.findSession(sessions, token)) {
      case null { #err("Unauthorized") };
      case (?session) {
        if (session.role != #staff) return #err("Unauthorized");
        let all = orders.map<Types.Order, Types.OrderInfo>(func(o) { OrderLib.toInfo(o) }).toArray();
        #ok(all);
      };
    };
  };

  // Update order payment status (staff only): confirm payment or mark delivered
  public func updateOrderStatus(token : AuthTypes.SessionToken, orderId : Types.OrderId, newStatus : Types.PaymentStatus) : async { #ok : Types.OrderInfo; #err : Text } {
    switch (AuthLib.findSession(sessions, token)) {
      case null { #err("Unauthorized") };
      case (?session) {
        if (session.role != #staff) return #err("Unauthorized");
        switch (orders.find(func(o : Types.Order) : Bool { o.orderId == orderId })) {
          case null { #err("Order not found") };
          case (?order) {
            order.paymentStatus := newStatus;
            #ok(OrderLib.toInfo(order));
          };
        };
      };
    };
  };

  // Search / filter orders (staff only)
  public query func searchOrders(token : AuthTypes.SessionToken, filter : Types.OrderFilter) : async { #ok : [Types.OrderInfo]; #err : Text } {
    switch (AuthLib.findSession(sessions, token)) {
      case null { #err("Unauthorized") };
      case (?session) {
        if (session.role != #staff) return #err("Unauthorized");
        #ok(OrderLib.filterOrders(orders, filter));
      };
    };
  };
};
