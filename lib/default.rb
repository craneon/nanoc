# All files in the 'lib' directory will be loaded
# before nanoc starts compiling.

include Nanoc3::Helpers::Blogging
include Nanoc3::Helpers::Tagging
include Nanoc3::Helpers::Rendering
include Nanoc3::Helpers::LinkTo

module PostHelper
  def get_pretty_date(post)
    attribute_to_time(post[:created_at]).strftime('%B %-d, %Y')
  end
end

include PostHelper

def get_post_start(post)
  content = post.compiled_content
  if content =~ /\s<!-- more -->\s/
    content = content.partition('<!-- more -->').first +
    "<div class='plus'><a> </a></div>
    <div class='read_more'>" +
    content.partition('<!-- more -->').last +
    "<div class='minus'><a> </a></div>
    </div>"
  end
  return content
end