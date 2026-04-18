import Types "../types/products";
import AuthTypes "../types/auth";
import ProductLib "../lib/products";
import AuthLib "../lib/auth";
import List "mo:core/List";
import Map "mo:core/Map";

mixin (
  products : List.List<Types.Product>,
  sessions : Map.Map<AuthTypes.SessionToken, AuthTypes.Session>,
  nextProductId : { var value : Nat },
) {
  // Get all products (public)
  public query func getProducts() : async [Types.ProductInfo] {
    products.map<Types.Product, Types.ProductInfo>(func(p) { ProductLib.toInfo(p) }).toArray();
  };

  // Get a single product by ID (public)
  public query func getProduct(id : Nat) : async ?Types.ProductInfo {
    switch (ProductLib.findById(products, id)) {
      case null { null };
      case (?p) { ?ProductLib.toInfo(p) };
    };
  };

  // Create a new product (staff only)
  public func createProduct(token : AuthTypes.SessionToken, input : Types.CreateProductInput) : async { #ok : Types.ProductInfo; #err : Text } {
    switch (AuthLib.findSession(sessions, token)) {
      case null { #err("Unauthorized") };
      case (?session) {
        if (session.role != #staff) return #err("Unauthorized");
        let id = nextProductId.value;
        nextProductId.value += 1;
        let product = ProductLib.create(id, input);
        products.add(product);
        #ok(ProductLib.toInfo(product));
      };
    };
  };

  // Update an existing product (staff only)
  public func updateProduct(token : AuthTypes.SessionToken, id : Nat, input : Types.UpdateProductInput) : async { #ok : Types.ProductInfo; #err : Text } {
    switch (AuthLib.findSession(sessions, token)) {
      case null { #err("Unauthorized") };
      case (?session) {
        if (session.role != #staff) return #err("Unauthorized");
        switch (ProductLib.findById(products, id)) {
          case null { #err("Product not found") };
          case (?product) {
            ProductLib.applyUpdate(product, input);
            #ok(ProductLib.toInfo(product));
          };
        };
      };
    };
  };

  // Delete a product (staff only)
  public func deleteProduct(token : AuthTypes.SessionToken, id : Nat) : async { #ok; #err : Text } {
    switch (AuthLib.findSession(sessions, token)) {
      case null { #err("Unauthorized") };
      case (?session) {
        if (session.role != #staff) return #err("Unauthorized");
        switch (products.findIndex(func(p : Types.Product) : Bool { p.id == id })) {
          case null { #err("Product not found") };
          case (?idx) {
            // Remove by filtering
            let remaining = products.filter(func(p : Types.Product) : Bool { p.id != id });
            products.clear();
            products.append(remaining);
            #ok;
          };
        };
      };
    };
  };

  // Toggle in-stock status (staff only)
  public func toggleStock(token : AuthTypes.SessionToken, id : Nat) : async { #ok : Types.ProductInfo; #err : Text } {
    switch (AuthLib.findSession(sessions, token)) {
      case null { #err("Unauthorized") };
      case (?session) {
        if (session.role != #staff) return #err("Unauthorized");
        switch (ProductLib.findById(products, id)) {
          case null { #err("Product not found") };
          case (?product) {
            product.inStock := not product.inStock;
            #ok(ProductLib.toInfo(product));
          };
        };
      };
    };
  };
};
