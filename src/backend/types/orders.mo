import Common "common";

module {
  public type OrderId = Common.OrderId;
  public type UserId = Common.UserId;
  public type Timestamp = Common.Timestamp;

  public type PaymentStatus = {
    #Processing;
    #UnderReview;
    #Confirmed;
    #Delivered;
  };

  public type PaymentMethod = {
    #BankTransfer;
    #ESewa;
  };

  public type OrderItem = {
    productId : Nat;
    productName : Text;
    priceNPR : Nat;
  };

  public type Order = {
    orderId : OrderId;
    userEmail : Text;
    items : [OrderItem];
    totalNPR : Nat;
    paymentMethod : PaymentMethod;
    var paymentStatus : PaymentStatus;
    timestamp : Timestamp;
  };

  public type CreateOrderInput = {
    userEmail : Text;
    items : [OrderItem];
    totalNPR : Nat;
    paymentMethod : PaymentMethod;
  };

  // Shared (public API) type — no var fields
  public type OrderInfo = {
    orderId : OrderId;
    userEmail : Text;
    items : [OrderItem];
    totalNPR : Nat;
    paymentMethod : PaymentMethod;
    paymentStatus : PaymentStatus;
    timestamp : Timestamp;
  };

  public type OrderFilter = {
    status : ?PaymentStatus;
    email : ?Text;
    productName : ?Text;
  };
};
