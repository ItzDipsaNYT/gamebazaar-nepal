import Types "../types/products";
import List "mo:core/List";

module {
  // Convert internal Product to shared ProductInfo
  public func toInfo(product : Types.Product) : Types.ProductInfo {
    {
      id = product.id;
      name = product.name;
      description = product.description;
      category = product.category;
      priceNPR = product.priceNPR;
      inStock = product.inStock;
      imageUrl = product.imageUrl;
      featured = product.featured;
    };
  };

  // Find product by ID
  public func findById(products : List.List<Types.Product>, id : Nat) : ?Types.Product {
    products.find(func(p) { p.id == id });
  };

  // Create a new product from input
  public func create(id : Nat, input : Types.CreateProductInput) : Types.Product {
    {
      id;
      var name = input.name;
      var description = input.description;
      var category = input.category;
      var priceNPR = input.priceNPR;
      var inStock = input.inStock;
      var imageUrl = input.imageUrl;
      var featured = input.featured;
    };
  };

  // Apply update fields to an existing product (in-place mutation)
  public func applyUpdate(product : Types.Product, input : Types.UpdateProductInput) {
    switch (input.name) { case (?v) { product.name := v }; case null {} };
    switch (input.description) { case (?v) { product.description := v }; case null {} };
    switch (input.category) { case (?v) { product.category := v }; case null {} };
    switch (input.priceNPR) { case (?v) { product.priceNPR := v }; case null {} };
    switch (input.inStock) { case (?v) { product.inStock := v }; case null {} };
    switch (input.imageUrl) { case (?v) { product.imageUrl := v }; case null {} };
    switch (input.featured) { case (?v) { product.featured := v }; case null {} };
  };

  // Return the initial seed catalog (18 products)
  public func seedProducts() : [Types.Product] {
    [
      { id = 0; var name = "Netflix Account Lifetime"; var description = "Lifetime access to Netflix streaming account"; var category = #Streaming; var priceNPR = 350; var inStock = true; var imageUrl = ""; var featured = true },
      { id = 1; var name = "Disney Account Lifetime"; var description = "Lifetime access to Disney+ streaming account"; var category = #Streaming; var priceNPR = 300; var inStock = true; var imageUrl = ""; var featured = true },
      { id = 2; var name = "Crunchyroll Mega Fan Lifetime"; var description = "Crunchyroll Mega Fan plan - lifetime access"; var category = #Streaming; var priceNPR = 300; var inStock = true; var imageUrl = ""; var featured = false },
      { id = 3; var name = "Filmora Lifetime"; var description = "Filmora video editor - lifetime license"; var category = #Software; var priceNPR = 150; var inStock = true; var imageUrl = ""; var featured = false },
      { id = 4; var name = "YouTube Premium Family 1 Month Owner"; var description = "YouTube Premium Family plan - 1 month owner access"; var category = #Streaming; var priceNPR = 500; var inStock = true; var imageUrl = ""; var featured = true },
      { id = 5; var name = "Spotify Premium 3 Months"; var description = "Spotify Premium subscription - 3 months"; var category = #Streaming; var priceNPR = 400; var inStock = true; var imageUrl = ""; var featured = true },
      { id = 6; var name = "Prime Video Lifetime"; var description = "Amazon Prime Video - lifetime access"; var category = #Streaming; var priceNPR = 200; var inStock = true; var imageUrl = ""; var featured = false },
      { id = 7; var name = "Robux 1000-2500"; var description = "Roblox Robux - 1000 to 2500 units"; var category = #Gaming; var priceNPR = 500; var inStock = true; var imageUrl = ""; var featured = false },
      { id = 8; var name = "Robux 2500-5000"; var description = "Roblox Robux - 2500 to 5000 units"; var category = #Gaming; var priceNPR = 850; var inStock = true; var imageUrl = ""; var featured = false },
      { id = 9; var name = "Robux 5000-10000"; var description = "Roblox Robux - 5000 to 10000 units"; var category = #Gaming; var priceNPR = 1350; var inStock = true; var imageUrl = ""; var featured = false },
      { id = 10; var name = "Robux 10000-15000"; var description = "Roblox Robux - 10000 to 15000 units"; var category = #Gaming; var priceNPR = 2000; var inStock = true; var imageUrl = ""; var featured = false },
      { id = 11; var name = "Minecraft Full Access No Warranty Gamepass"; var description = "Minecraft full account access - no warranty, includes gamepass"; var category = #Gaming; var priceNPR = 500; var inStock = true; var imageUrl = ""; var featured = false },
      { id = 12; var name = "Minecraft Full Access Lifetime Warranty"; var description = "Minecraft full account access - lifetime warranty guaranteed"; var category = #Gaming; var priceNPR = 1150; var inStock = true; var imageUrl = ""; var featured = false },
      { id = 13; var name = "Clash Royale Trophies 1000-3000"; var description = "Clash Royale trophy boost - 1000 to 3000 trophies"; var category = #Gaming; var priceNPR = 450; var inStock = true; var imageUrl = ""; var featured = false },
      { id = 14; var name = "Clash Royale Trophies 5000-8000"; var description = "Clash Royale trophy boost - 5000 to 8000 trophies"; var category = #Gaming; var priceNPR = 1350; var inStock = true; var imageUrl = ""; var featured = false },
      { id = 15; var name = "ChatGPT+ Method"; var description = "ChatGPT Plus access method"; var category = #Software; var priceNPR = 4000; var inStock = true; var imageUrl = ""; var featured = false },
      { id = 16; var name = "ChatGPT+ Full Access"; var description = "ChatGPT Plus full account access"; var category = #Software; var priceNPR = 300; var inStock = true; var imageUrl = ""; var featured = false },
      { id = 17; var name = "CapCut Pro"; var description = "CapCut Pro video editor - premium access"; var category = #Software; var priceNPR = 350; var inStock = true; var imageUrl = ""; var featured = false },
    ];
  };
};
