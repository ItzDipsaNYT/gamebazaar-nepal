module {
  public type DailyRevenue = {
    date : Text; // "YYYY-MM-DD"
    revenueNPR : Nat;
    orderCount : Nat;
  };

  public type TopProduct = {
    productId : Nat;
    productName : Text;
    orderCount : Nat;
    revenueNPR : Nat;
  };

  public type StatusDistribution = {
    processing : Nat;
    underReview : Nat;
    confirmed : Nat;
    delivered : Nat;
  };

  public type AnalyticsSummary = {
    totalRevenueNPR : Nat;
    totalOrders : Nat;
    confirmedOrders : Nat;
    deliveredOrders : Nat;
    pendingOrders : Nat;
  };
};
