import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Product, Deal, Coupon, AffiliateClickLog } from '../types';
import { INITIAL_PRODUCTS, INITIAL_DEALS, INITIAL_COUPONS, INITIAL_AFFILIATE_LOGS } from '../data/mockData';

// Fetch all products with store prices & price history
export async function getProductsService(): Promise<Product[]> {
  if (!isSupabaseConfigured) {
    return INITIAL_PRODUCTS;
  }

  try {
    const { data: dbProducts, error: prodError } = await supabase
      .from('products')
      .select('*');

    if (prodError || !dbProducts || dbProducts.length === 0) {
      console.warn('Supabase products empty or error, using mock data:', prodError?.message);
      return INITIAL_PRODUCTS;
    }

    const { data: dbStores } = await supabase.from('store_prices').select('*');
    const { data: dbHistory } = await supabase.from('price_history').select('*');

    return dbProducts.map(p => {
      const stores = (dbStores || [])
        .filter(s => s.product_id === p.id)
        .map(s => ({
          store: s.store_name,
          price: Number(s.price),
          discount: Number(s.discount || 0),
          couponCode: s.coupon_code || undefined,
          shipping: s.shipping || 'Free Shipping',
          badge: s.badge || undefined,
          url: s.affiliate_url
        }));

      const priceHistory = (dbHistory || [])
        .filter(h => h.product_id === p.id)
        .map(h => ({
          date: h.record_date,
          amazon: Number(h.amazon_price || 0),
          flipkart: Number(h.flipkart_price || 0),
          croma: Number(h.croma_price || 0)
        }));

      return {
        id: p.id,
        title: p.title,
        slug: p.slug,
        brand: p.brand,
        category: p.category,
        subcategory: p.subcategory,
        mainImage: p.main_image,
        galleryImages: p.gallery_images || [p.main_image],
        bestPrice: Number(p.best_price),
        originalPrice: Number(p.original_price),
        discountPercentage: Number(p.discount_percentage || 0),
        rating: Number(p.rating || 4.5),
        reviewCount: Number(p.review_count || 10),
        badge: p.badge || undefined,
        stores: stores.length > 0 ? stores : (INITIAL_PRODUCTS.find(m => m.id === p.id)?.stores || []),
        specs: p.specs || {},
        pros: p.pros || [],
        cons: p.cons || [],
        priceHistory: priceHistory.length > 0 ? priceHistory : (INITIAL_PRODUCTS.find(m => m.id === p.id)?.priceHistory || []),
        isTodayDeal: Boolean(p.is_today_deal),
        createdDate: p.created_date || new Date().toISOString().slice(0, 10)
      };
    });
  } catch (err) {
    console.error('Error in getProductsService:', err);
    return INITIAL_PRODUCTS;
  }
}

// Fetch all active deals
export async function getDealsService(): Promise<Deal[]> {
  if (!isSupabaseConfigured) return INITIAL_DEALS;
  try {
    const { data, error } = await supabase.from('deals').select('*');
    if (error || !data || data.length === 0) return INITIAL_DEALS;
    return data.map(d => ({
      id: d.id,
      title: d.title,
      category: d.category,
      store: d.store,
      originalPrice: Number(d.original_price),
      dealPrice: Number(d.deal_price),
      discount: d.discount,
      description: d.description || '',
      image: d.image,
      link: d.link
    }));
  } catch {
    return INITIAL_DEALS;
  }
}

// Fetch verified coupons
export async function getCouponsService(): Promise<Coupon[]> {
  if (!isSupabaseConfigured) return INITIAL_COUPONS;
  try {
    const { data, error } = await supabase.from('coupons').select('*');
    if (error || !data || data.length === 0) return INITIAL_COUPONS;
    return data.map(c => ({
      id: c.id,
      store: c.store,
      code: c.code,
      discountText: c.discount_text,
      description: c.description || '',
      minSpend: c.min_spend || undefined,
      expiresAt: c.expires_at
    }));
  } catch {
    return INITIAL_COUPONS;
  }
}

// Insert new product into Supabase
export async function insertProductService(product: Product): Promise<boolean> {
  if (!isSupabaseConfigured) return false;
  try {
    const { error: prodErr } = await supabase.from('products').insert([{
      id: product.id,
      title: product.title,
      slug: product.slug,
      brand: product.brand,
      category: product.category,
      subcategory: product.subcategory,
      main_image: product.mainImage,
      gallery_images: product.galleryImages,
      best_price: product.bestPrice,
      original_price: product.originalPrice,
      discount_percentage: product.discountPercentage,
      rating: product.rating,
      review_count: product.reviewCount,
      badge: product.badge,
      specs: product.specs,
      pros: product.pros,
      cons: product.cons,
      created_date: product.createdDate
    }]);

    if (prodErr) {
      console.error('Failed inserting product to Supabase:', prodErr.message);
      return false;
    }

    if (product.stores && product.stores.length > 0) {
      const storesToInsert = product.stores.map(st => ({
        product_id: product.id,
        store_name: st.store,
        price: st.price,
        discount: st.discount,
        coupon_code: st.couponCode,
        shipping: st.shipping,
        badge: st.badge,
        affiliate_url: st.url
      }));
      await supabase.from('store_prices').insert(storesToInsert);
    }

    return true;
  } catch (err) {
    console.error('Error inserting product:', err);
    return false;
  }
}

// Log affiliate click into Supabase
export async function logAffiliateClickService(log: AffiliateClickLog): Promise<void> {
  if (!isSupabaseConfigured) return;
  try {
    await supabase.from('affiliate_logs').insert([{
      id: log.id,
      product_id: log.productId,
      product_title: log.productTitle,
      store: log.store,
      commission_earned: log.commissionEarned,
      status: log.status,
      user_region: log.userRegion
    }]);
  } catch (err) {
    console.error('Failed logging click event:', err);
  }
}

// Fetch affiliate logs from Supabase
export async function getAffiliateLogsService(): Promise<AffiliateClickLog[]> {
  if (!isSupabaseConfigured) return INITIAL_AFFILIATE_LOGS;
  try {
    const { data, error } = await supabase
      .from('affiliate_logs')
      .select('*')
      .order('click_timestamp', { ascending: false });

    if (error || !data) return INITIAL_AFFILIATE_LOGS;

    return data.map(l => ({
      id: l.id,
      productId: l.product_id,
      productTitle: l.product_title,
      store: l.store,
      timestamp: new Date(l.click_timestamp).toISOString().replace('T', ' ').slice(0, 16),
      commissionEarned: Number(l.commission_earned),
      status: l.status || 'Clicked',
      userRegion: l.user_region || 'Live Visitor'
    }));
  } catch {
    return INITIAL_AFFILIATE_LOGS;
  }
}
