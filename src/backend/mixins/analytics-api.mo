import Types "../types/analytics";
import AuthTypes "../types/auth";
import OrderTypes "../types/orders";
import AnalyticsLib "../lib/analytics";
import AuthLib "../lib/auth";
import List "mo:core/List";
import Map "mo:core/Map";

mixin (
  orders : List.List<OrderTypes.Order>,
  sessions : Map.Map<AuthTypes.SessionToken, AuthTypes.Session>,
) {
  // Get analytics summary (staff only)
  public query func getAnalyticsSummary(token : AuthTypes.SessionToken) : async { #ok : Types.AnalyticsSummary; #err : Text } {
    switch (AuthLib.findSession(sessions, token)) {
      case null { #err("Unauthorized") };
      case (?session) {
        if (session.role != #staff) return #err("Unauthorized");
        #ok(AnalyticsLib.getSummary(orders));
      };
    };
  };

  // Get daily revenue for last 30 days (staff only)
  public query func getDailyRevenue(token : AuthTypes.SessionToken) : async { #ok : [Types.DailyRevenue]; #err : Text } {
    switch (AuthLib.findSession(sessions, token)) {
      case null { #err("Unauthorized") };
      case (?session) {
        if (session.role != #staff) return #err("Unauthorized");
        #ok(AnalyticsLib.getDailyRevenue(orders));
      };
    };
  };

  // Get top products by order count (staff only)
  public query func getTopProducts(token : AuthTypes.SessionToken, limit : Nat) : async { #ok : [Types.TopProduct]; #err : Text } {
    switch (AuthLib.findSession(sessions, token)) {
      case null { #err("Unauthorized") };
      case (?session) {
        if (session.role != #staff) return #err("Unauthorized");
        #ok(AnalyticsLib.getTopProducts(orders, limit));
      };
    };
  };

  // Get payment status distribution (staff only)
  public query func getStatusDistribution(token : AuthTypes.SessionToken) : async { #ok : Types.StatusDistribution; #err : Text } {
    switch (AuthLib.findSession(sessions, token)) {
      case null { #err("Unauthorized") };
      case (?session) {
        if (session.role != #staff) return #err("Unauthorized");
        #ok(AnalyticsLib.getStatusDistribution(orders));
      };
    };
  };
};
