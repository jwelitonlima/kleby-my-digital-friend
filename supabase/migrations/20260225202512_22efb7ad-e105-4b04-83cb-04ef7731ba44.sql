
-- Admin role system
CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Helper function
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
$$;

-- Site content (key-value)
CREATE TABLE public.site_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read" ON public.site_content FOR SELECT USING (true);
CREATE POLICY "Admin insert" ON public.site_content FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admin update" ON public.site_content FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admin delete" ON public.site_content FOR DELETE USING (public.is_admin());

-- Site images
CREATE TABLE public.site_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  url TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.site_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read images" ON public.site_images FOR SELECT USING (true);
CREATE POLICY "Admin insert images" ON public.site_images FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admin update images" ON public.site_images FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admin delete images" ON public.site_images FOR DELETE USING (public.is_admin());

-- Storage bucket for images
INSERT INTO storage.buckets (id, name, public) VALUES ('site-images', 'site-images', true);

CREATE POLICY "Public read storage" ON storage.objects FOR SELECT USING (bucket_id = 'site-images');
CREATE POLICY "Admin upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'site-images' AND public.is_admin());
CREATE POLICY "Admin update storage" ON storage.objects FOR UPDATE USING (bucket_id = 'site-images' AND public.is_admin());
CREATE POLICY "Admin delete storage" ON storage.objects FOR DELETE USING (bucket_id = 'site-images' AND public.is_admin());

-- User roles RLS
CREATE POLICY "Admin read roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);

-- Seed default content
INSERT INTO public.site_content (key, value) VALUES
  ('hero_label', 'Personal Trainer · CREF 000849-G/PI'),
  ('hero_line1', 'Método.'),
  ('hero_line2', 'Constância.'),
  ('hero_line3', 'Resultado.'),
  ('hero_subtitle', 'Treinamento estratégico para evolução real.'),
  ('hero_cta', 'Iniciar Avaliação'),
  ('hero_cta2', 'Conhecer o método'),
  ('metodo_label', 'O Método'),
  ('metodo_title', 'Como funciona'),
  ('metodo_subtitle', 'Um sistema claro de evolução, do primeiro treino ao resultado.'),
  ('cta_title', 'Comece agora.'),
  ('cta_subtitle', 'Evolua com segurança e estratégia.'),
  ('footer_desc', 'Treinamento estratégico para evolução real.'),
  ('whatsapp_number', '5589988038518'),
  ('whatsapp_message', 'Olá, Kléby! Quero agendar uma avaliação e entender o melhor plano para meu objetivo.'),
  ('instagram_link', 'https://instagram.com/kleby.almeida_personal'),
  ('instagram_handle', '@kleby.almeida_personal'),
  ('email', 'klebialmeidapersonal@gmail.com'),
  ('cref', '000849-G/PI');

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_site_content_updated_at BEFORE UPDATE ON public.site_content FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_site_images_updated_at BEFORE UPDATE ON public.site_images FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
