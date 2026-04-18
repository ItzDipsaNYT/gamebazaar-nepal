import List "mo:core/List";
import Map "mo:core/Map";

import AuthTypes "types/auth";
import ProductTypes "types/products";
import OrderTypes "types/orders";

import ProductLib "lib/products";

import AuthApi "mixins/auth-api";
import ProductsApi "mixins/products-api";
import OrdersApi "mixins/orders-api";
import AnalyticsApi "mixins/analytics-api";

actor {
  // --- Persistent state ---
  let users = List.empty<AuthTypes.User>();
  let sessions = Map.empty<AuthTypes.SessionToken, AuthTypes.Session>();

  let products = List.empty<ProductTypes.Product>();
  let nextProductId = { var value : Nat = 0 };

  let orders = List.empty<OrderTypes.Order>();
  let nextOrderCounter = { var value : Nat = 0 };

  // --- Seed products on first deploy (only if catalog is empty) ---
  do {
    if (products.size() == 0) {
      let seeds = ProductLib.seedProducts();
      for (p in seeds.vals()) {
        products.add(p);
      };
      nextProductId.value := seeds.size();
    };
  };

  // --- Mixin composition ---
  include AuthApi(users, sessions);
  include ProductsApi(products, sessions, nextProductId);
  include OrdersApi(orders, sessions, nextOrderCounter);
  include AnalyticsApi(orders, sessions);
};
