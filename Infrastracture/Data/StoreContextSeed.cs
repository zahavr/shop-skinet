using Core.Entities;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Infrastracture.Data
{
    public class StoreContextSeed
    {
        public static async Task SeedAsync(StoreContext context, ILoggerFactory loggerFactory)
        {
            try
            {
                if (!context.ProductBrands.Any())
                {
                    string brandsData = File.ReadAllText("../Infrastracture/Data/SeedData/brands.json");

                    List<ProductBrand> brands = JsonSerializer.Deserialize<List<ProductBrand>>(brandsData);

                    foreach (ProductBrand item in brands)
                    {
                        context.ProductBrands.Add(item);
                    }

                    await context.SaveChangesAsync();

                }

                if (!context.ProductTypes.Any())
                {
                    string productTypeData = File.ReadAllText("../Infrastracture/Data/SeedData/types.json");

                    List<ProductType> productTypes = JsonSerializer.Deserialize<List<ProductType>>(productTypeData);

                    foreach (ProductType item in productTypes)
                    {
                        context.ProductTypes.Add(item);
                    }

                    await context.SaveChangesAsync();

                }

                if (!context.Products.Any())
                {
                    string productsData = File.ReadAllText("../Infrastracture/Data/SeedData/products.json");

                    List<Product> products = JsonSerializer.Deserialize<List<Product>>(productsData);

                    foreach (Product item in products)
                    {
                        context.Products.Add(item);
                    }

                    await context.SaveChangesAsync();

                }
            }
            catch (Exception ex)
            {
                ILogger<StoreContextSeed> logger = loggerFactory.CreateLogger<StoreContextSeed>();
                logger.LogError(ex.Message);
            }
        }
    }
}
