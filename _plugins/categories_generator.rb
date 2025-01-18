module Jekyll
  class CategoryPage < Page
    def initialize(site, base, dir, category)
      @site = site
      @base = base
      @dir = dir
      @name = 'index.html'

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'category.html')
      self.data['category'] = category
      self.data['title'] = category.capitalize
    end
  end

  class CategoryGenerator < Generator
    safe true

    def generate(site)
      if site.layouts.key? 'category'
        dir = site.config['category_dir'] || 'categories'
        categories = site.posts.docs.flat_map { |post| post['categories'] }.uniq
        categories.each do |category|
          puts "Generating category page for #{category}" # Log tambahan
          write_category_page(site, File.join(dir, category), category)
        end
      end
    end

    def write_category_page(site, dir, category)
      index = CategoryPage.new(site, site.source, dir, category)
      index.render(site.layouts, site.site_payload)
      index.write(site.dest)
      site.pages << index
    end
  end
end
