type TProductSort = 'new' | 'popular';

type TProductRow = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  original_price: number | null;
  thumbnail_path: string;
  rating: number;
  review_count: number;
  badge: string | null;
};

const MAX_LIMIT = 24;

function getLimit(value: string | null) {
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed < 1) {
    return 12;
  }

  return Math.min(parsed, MAX_LIMIT);
}

function getSort(value: string | null): TProductSort {
  return value === 'popular' ? 'popular' : 'new';
}

function getOrder(sort: TProductSort) {
  if (sort === 'popular') {
    return 'review_count.desc,rating.desc,created_at.desc';
  }

  return 'created_at.desc';
}

export async function GET(request: Request) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !publishableKey) {
    return Response.json({ message: 'Supabase 환경 변수가 설정되지 않았습니다.' }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const categories = searchParams
    .get('categories')
    ?.split(',')
    .map((category) => category.trim())
    .filter(Boolean);
  const category = searchParams.get('category');
  const limit = getLimit(searchParams.get('limit'));
  const sort = getSort(searchParams.get('sort'));
  const params = new URLSearchParams({
    select:
      'id,slug,name,brand,category,price,original_price,thumbnail_path,rating,review_count,badge',
    limit: String(limit),
    order: getOrder(sort),
  });

  if (categories && categories.length > 0) {
    params.set('category', `in.(${categories.join(',')})`);
  } else if (category) {
    params.set('category', `eq.${category}`);
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/products?${params}`, {
    headers: {
      apikey: publishableKey,
      Authorization: `Bearer ${publishableKey}`,
    },
  });

  if (!response.ok) {
    return Response.json({ message: '상품 정보를 불러오지 못했습니다.' }, { status: 502 });
  }

  const products = (await response.json()) as TProductRow[];

  return Response.json({ products });
}
