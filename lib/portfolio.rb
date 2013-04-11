module PortfolioHelper

  def portfolios
    @items.select { |item| item[:kind] == 'portfolio' }
  end

  def sorted_portfolios
    portfolios.sort_by { |p| p[:rank] }.reverse
  end
end

include PortfolioHelper