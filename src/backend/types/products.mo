import Common "common";

module {
  public type Timestamp = Common.Timestamp;

  public type Category = { #Streaming; #Gaming; #Software };

  public type Product = {
    id : Nat;
    var name : Text;
    var description : Text;
    var category : Category;
    var priceNPR : Nat;
    var inStock : Bool;
    var imageUrl : Text;
    var featured : Bool;
  };

  // Shared (public API) type — no var fields
  public type ProductInfo = {
    id : Nat;
    name : Text;
    description : Text;
    category : Category;
    priceNPR : Nat;
    inStock : Bool;
    imageUrl : Text;
    featured : Bool;
  };

  public type CreateProductInput = {
    name : Text;
    description : Text;
    category : Category;
    priceNPR : Nat;
    inStock : Bool;
    imageUrl : Text;
    featured : Bool;
  };

  public type UpdateProductInput = {
    name : ?Text;
    description : ?Text;
    category : ?Category;
    priceNPR : ?Nat;
    inStock : ?Bool;
    imageUrl : ?Text;
    featured : ?Bool;
  };
};
