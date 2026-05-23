-- Products table: the master catalogue
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  size TEXT,
  price NUMERIC(6,2),
  category TEXT NOT NULL,
  is_regular BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Shopping lists
CREATE TABLE shopping_lists (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'completed')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  submitted_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ
);

-- List items (junction)
CREATE TABLE list_items (
  id SERIAL PRIMARY KEY,
  list_id UUID REFERENCES shopping_lists(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER DEFAULT 1,
  added_at TIMESTAMPTZ DEFAULT now()
);

-- Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE shopping_lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE list_items ENABLE ROW LEVEL SECURITY;

-- Public read/write (no auth)
CREATE POLICY "Public access" ON products FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public access" ON shopping_lists FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public access" ON list_items FOR ALL USING (true) WITH CHECK (true);

-- Seed the product catalogue
INSERT INTO products (name, size, price, category, sort_order) VALUES
  ('Baby Spinach', '120g', 2.70, 'Fruit & Veg', 1),
  ('Baby Cos Lettuce', NULL, 3.50, 'Fruit & Veg', 2),
  ('Cocktail Tomatoes Truss', NULL, 3.90, 'Fruit & Veg', 3),
  ('Pears', 'each', NULL, 'Fruit & Veg', 4),
  ('Red Grapes', NULL, NULL, 'Fruit & Veg', 5),
  ('Vaalia Probiotic Yoghurt Vanilla', '4 pack', 5.00, 'Dairy', 10),
  ('Powdered Milk Full Cream', NULL, 10.50, 'Dairy', 11),
  ('Half Loaf of Bread', NULL, NULL, 'Bread & Bakery', 20),
  ('Hi Fibre Bread Rolls', '4 pack', 2.70, 'Bread & Bakery', 21),
  ('Arnott''s Saladas', '250g', 3.40, 'Pantry', 30),
  ('Milo', '1kg', 17.50, 'Pantry', 31),
  ('Twinings Chamomile Tea', NULL, 8.00, 'Pantry', 32),
  ('Sustagen', '3 pack', 7.00, 'Pantry', 33),
  ('Ouma Buttermilk Rusks', NULL, 7.00, 'Pantry', 34),
  ('Raw Sugar', '2kg', 3.20, 'Pantry', 35),
  ('Arborio Rice', '1kg', 4.00, 'Pantry', 36),
  ('Weet-Bix', 'small box', NULL, 'Pantry', 37),
  ('Bottled Peaches', NULL, NULL, 'Pantry', 38),
  ('Herbert Adams King Island Beef Pie', '2 pack', 6.90, 'Frozen', 50);
