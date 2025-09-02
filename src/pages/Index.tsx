import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  warranty: string;
  image: string;
  description: string;
  inStock: boolean;
}

interface WarrantyItem {
  id: string;
  productName: string;
  purchaseDate: string;
  warrantyEnd: string;
  status: 'active' | 'expired' | 'claimed';
}

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [warranties, setWarranties] = useState<WarrantyItem[]>([
    {
      id: 'W001',
      productName: 'Насос центробежный AquaPro 1500',
      purchaseDate: '2024-03-15',
      warrantyEnd: '2026-03-15',
      status: 'active'
    },
    {
      id: 'W002', 
      productName: 'Фильтр песочный FiltroMax 600',
      purchaseDate: '2023-08-20',
      warrantyEnd: '2025-08-20',
      status: 'active'
    }
  ]);

  const products: Product[] = [
    {
      id: 1,
      name: 'Насос Aquaviva JA150M (220 В, 21 м3/ч, 1.5HP)',
      price: 45000,
      category: 'equipment',
      warranty: '2 года',
      image: '/img/d0fc7671-268a-41fc-97c8-a479b916053e.jpg',
      description: 'Мощный центробежный насос для бассейнов до 50 м³',
      inStock: true
    },
    {
      id: 2,
      name: 'Фильтр песочный FiltroMax 600',
      price: 32000,
      category: 'equipment',
      warranty: '18 месяцев',
      image: '/img/d0fc7671-268a-41fc-97c8-a479b916053e.jpg',
      description: 'Эффективная очистка воды в бассейнах до 30 м³',
      inStock: true
    },
    {
      id: 3,
      name: 'Трубы ПВХ 50мм (комплект 10м)',
      price: 3200,
      category: 'pipes',
      warranty: '5 лет',
      image: '/img/d0fc7671-268a-41fc-97c8-a479b916053e.jpg',
      description: 'Высококачественные трубы для водопроводных систем',
      inStock: true
    },
    {
      id: 4,
      name: 'Скиммер встраиваемый AquaSkip Pro',
      price: 8500,
      category: 'accessories',
      warranty: '1 год',
      image: '/img/d0fc7671-268a-41fc-97c8-a479b916053e.jpg',
      description: 'Система сбора загрязнений с поверхности воды',
      inStock: true
    },
    {
      id: 5,
      name: 'Прожектор LED подводный 12В 18Вт',
      price: 5800,
      category: 'lighting',
      warranty: '3 года',
      image: '/img/d0fc7671-268a-41fc-97c8a479b916053e.jpg',
      description: 'Энергоэффективное освещение с RGB подсветкой',
      inStock: false
    },
    {
      id: 6,
      name: 'Химия для обеззараживания 5л',
      price: 1200,
      category: 'chemistry',
      warranty: 'Не применимо',
      image: '/img/d0fc7671-268a-41fc-97c8-a479b916053e.jpg',
      description: 'Средство для поддержания чистоты воды',
      inStock: true
    }
  ];

  const categories = [
    { id: 'all', name: 'Все товары', icon: 'Grid3X3' },
    { id: 'equipment', name: 'Оборудование', icon: 'Settings' },
    { id: 'pipes', name: 'Трубопроводы ПВХ', icon: 'Pipe' },
    { id: 'accessories', name: 'Закладные элементы', icon: 'Package' },
    { id: 'lighting', name: 'Освещение', icon: 'Lightbulb' },
    { id: 'chemistry', name: 'Химия', icon: 'TestTube' }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const addToWarranty = (product: Product) => {
    const today = new Date();
    const warrantyEnd = new Date(today);
    warrantyEnd.setFullYear(warrantyEnd.getFullYear() + 2);
    
    const newWarranty: WarrantyItem = {
      id: `W${String(warranties.length + 1).padStart(3, '0')}`,
      productName: product.name,
      purchaseDate: today.toISOString().split('T')[0],
      warrantyEnd: warrantyEnd.toISOString().split('T')[0],
      status: 'active'
    };
    
    setWarranties([...warranties, newWarranty]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-water-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-water-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-water-600 rounded-lg flex items-center justify-center">
                <Icon name="Waves" className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">АКВАИР</h1>
                <p className="text-sm text-gray-600">Оборудование для бассейнов</p>
              </div>
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Icon name="Shield" size={16} />
                  Гарантийное обслуживание
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Icon name="Shield" size={20} />
                    Система отслеживания гарантий
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  {warranties.map((warranty) => (
                    <Card key={warranty.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900">{warranty.productName}</h4>
                          <p className="text-sm text-gray-600">ID: {warranty.id}</p>
                          <p className="text-sm text-gray-600">
                            Дата покупки: {new Date(warranty.purchaseDate).toLocaleDateString('ru-RU')}
                          </p>
                          <p className="text-sm text-gray-600">
                            Гарантия до: {new Date(warranty.warrantyEnd).toLocaleDateString('ru-RU')}
                          </p>
                        </div>
                        <Badge 
                          variant={warranty.status === 'active' ? 'default' : 'secondary'}
                          className={warranty.status === 'active' ? 'bg-green-500' : ''}
                        >
                          {warranty.status === 'active' ? 'Активна' : 'Истекла'}
                        </Badge>
                      </div>
                    </Card>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-water-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-4">Профессиональное оборудование для бассейнов</h2>
          <p className="text-xl mb-8 opacity-90">Качественные решения для частных и коммерческих бассейнов</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
              <Icon name="Truck" size={20} />
              <span>Быстрая доставка</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {/* Category Filter */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">Каталог товаров</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="gap-2"
              >
                <Icon name={category.icon as any} size={16} />
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-video bg-water-100 relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge variant="secondary" className="bg-red-500 text-white">
                      Нет в наличии
                    </Badge>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-lg text-gray-900 line-clamp-2">{product.name}</h4>
                  <Badge variant="outline" className="shrink-0 ml-2">
                    {product.warranty}
                  </Badge>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-2xl font-bold text-primary-600">
                      {product.price.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                  
                  <Button
                    disabled={!product.inStock}
                    onClick={() => addToWarranty(product)}
                    className="gap-2"
                  >
                    <Icon name="ShoppingCart" size={16} />
                    {product.inStock ? 'В корзину' : 'Нет в наличии'}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>


      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-water-600 rounded-lg flex items-center justify-center">
                  <Icon name="Waves" className="text-white" size={20} />
                </div>
                <span className="text-xl font-bold">Акваир</span>
              </div>
              <p className="text-gray-400">Профессиональное оборудование для бассейнов любой сложности</p>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Каталог</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Насосы и фильтры</li>
                <li>Трубопроводные системы</li>
                <li>Системы освещения</li>
                <li>Химия для бассейнов</li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Услуги</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Монтаж оборудования</li>
                <li>Гарантийное обслуживание</li>
                <li>Техническая поддержка</li>
                <li>Консультации специалистов</li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Контакты</h5>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  <span>+7 (495) 123-45-67</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  <span>info@aquapool.ru</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} />
                  <span>Москва, ул. Водная, 123</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AquaPool Store. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;