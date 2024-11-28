module Jekyll
  class CategoryGenerator < Generator
    safe true

    def generate(site)
      categories = []
      Dir.foreach("categories") do |category|
        next if category == '.' or category == '..'
        category_path = "/categories/#{category}"
        post_count = Dir[File.join("categories/#{category}", "**", "*")].count { |file| File.file?(file) }
        categories << { "name" => category.capitalize, "url" => category_path, "posts" => post_count }
      end
      site.config['categories'] = categories
    end
  end
end
