import { useState, useMemo } from 'react';
import { User, Star, MapPin, Package, MessageSquare, Calendar, DollarSign, Shield, BadgeCheck, Clock, Wallet, Check, X } from 'lucide-react';
import Header from '@/components/Header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockUsers, mockProducts, mockSoldProducts, mockConversations, mockMessages } from '@/data/mockData';
import { useParams } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import { formatDistanceToNow, format } from 'date-fns';
import { es } from 'date-fns/locale';
import { OfferWithDetails } from '@/types/marketplace';

const ProfilePage = () => {
  const { userId = '1' } = useParams(); // Default to first user if no ID provided
  const user = mockUsers.find(u => u.id === userId) || mockUsers[0];
  
  // Filter products by this user
  const userProducts = mockProducts.filter(p => p.seller?.id === user.id);
  
  // Filter sold products by this user
  const userSoldProducts = mockSoldProducts.filter(p => p.sellerId === user.id);
  
  // Get product details for each sold product
  const soldProductsWithDetails = userSoldProducts.map(soldProduct => {
    const productDetails = mockProducts.find(p => p.id === soldProduct.productId);
    const buyerDetails = mockUsers.find(u => u.id === soldProduct.buyerId);
    return {
      ...soldProduct,
      product: productDetails,
      buyer: buyerDetails
    };
  });
  
  // Extract offers from conversations
  const userOffers = useMemo(() => {
    const extractedOffers: OfferWithDetails[] = [];
    
    // Find all conversations this user is part of
    const userConversations = mockConversations.filter(conv => 
      conv.participants.some(p => p.id === user.id)
    );
    
    // Go through each conversation and extract offers
    userConversations.forEach(conversation => {
      const product = conversation.product;
      const otherUser = conversation.participants.find(p => p.id !== user.id)!;
      
      conversation.messages.forEach(message => {
        if (message.type === 'offer' && message.offer) {
          const isUserSender = message.senderId === user.id;
          
          extractedOffers.push({
            id: message.offer.id,
            product,
            amount: message.offer.amount,
            status: message.offer.status,
            date: message.timestamp,
            otherUser,
            message: message.content,
            isUserSender
          });
        }
      });
    });
    
    return extractedOffers;
  }, [user.id]);
  
  // Separate offers sent and received
  const offersSent = userOffers.filter(offer => offer.isUserSender);
  const offersReceived = userOffers.filter(offer => !offer.isUserSender);
  
  const [activeTab, setActiveTab] = useState('productos');
  
  const handleProductClick = (productId: string) => {
    console.log('Product clicked:', productId);
    // Navigation will be handled by ProductCard component
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>
                <User className="h-12 w-12" />
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2 text-gray-600">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>Buenos Aires, Argentina</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Usuario desde 2023</span>
                </div>
                <div className="flex items-center text-yellow-500">
                  <Star className="h-4 w-4 mr-1 fill-current" />
                  <span className="font-medium">{user.rating}</span>
                  <span className="text-gray-600 ml-1">(124 reseñas)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Qualification Badges */}
        {user.badges && user.badges.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Insignias del vendedor</h2>
            <div className="flex flex-wrap gap-3">
              {user.badges.map((badge, index) => (
                <div key={index} className="inline-flex items-center px-3 py-1.5 bg-purple-50 border border-purple-100 rounded-full">
                  <BadgeCheck className="h-4 w-4 text-purple-600 mr-2" />
                  <span className="text-sm font-medium text-purple-700">{badge}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Salame Pay Info */}
        {user.salamePay && (
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-sm p-6 mb-6 text-white">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Wallet className="h-8 w-8 mr-3" />
                <div>
                  <h2 className="text-lg font-semibold">Salame Pay</h2>
                  <p className="text-purple-100 text-sm">Tu billetera digital</p>
                </div>
              </div>
              {user.salamePay.isVerified && (
                <div className="flex items-center bg-white bg-opacity-20 px-3 py-1 rounded-full">
                  <Shield className="h-4 w-4 mr-1 text-green-300" />
                  <span className="text-sm">Verificado</span>
                </div>
              )}
            </div>
            
            <div className="mt-4">
              <p className="text-sm text-purple-100">Balance disponible:</p>
              <p className="text-3xl font-bold">${user.salamePay.balance.toLocaleString('es-AR')}</p>
            </div>
          </div>
        )}
        
        {/* Seller Description */}
        {user.description && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold mb-2">Acerca de {user.name}</h2>
            <p className="text-gray-600">{user.description}</p>
            
            {user.specialization && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center text-gray-700">
                  <Star className="h-4 w-4 mr-2 text-amber-500" />
                  <span className="font-medium">Especializado en:</span>
                  <span className="ml-2">{user.specialization}</span>
                </div>
              </div>
            )}
            
            {user.responseRate && (
              <div className="mt-3 flex items-center text-gray-700">
                <Clock className="h-4 w-4 mr-2 text-blue-500" />
                <span className="font-medium">Tasa de respuesta:</span>
                <span className="ml-2">{user.responseRate}%</span>
              </div>
            )}
          </div>
        )}
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="flex items-center p-4">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <Package className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Productos</div>
                <div className="text-2xl font-bold">{userProducts.length}</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center p-4">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <Star className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Calificación</div>
                <div className="text-2xl font-bold">{user.rating}/5</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center p-4">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Tiempo de respuesta</div>
                <div className="text-2xl font-bold">1h</div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Tabs */}
        <Tabs defaultValue="productos" value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="productos">Productos</TabsTrigger>
            <TabsTrigger value="vendidos">Vendidos</TabsTrigger>
            <TabsTrigger value="ofertas">Ofertas</TabsTrigger>
            <TabsTrigger value="resenas">Reseñas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="productos">
            {userProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {userProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={() => handleProductClick(product.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No hay productos publicados</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="ofertas">
            {userOffers.length > 0 ? (
              <div className="space-y-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Ofertas enviadas</h3>
                  {offersSent.length > 0 ? (
                    <div className="space-y-4">
                      {offersSent.map((offer) => (
                        <Card key={offer.id} className="overflow-hidden">
                          <div className="flex flex-col md:flex-row">
                            {/* Product Image */}
                            <div className="w-full md:w-1/4 h-48 md:h-auto bg-gray-100">
                              <img 
                                src={offer.product.images[0]} 
                                alt={offer.product.title} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            
                            {/* Offer Details */}
                            <div className="flex-1 p-6">
                              <div className="flex flex-col md:flex-row md:justify-between">
                                <div>
                                  <h3 className="text-xl font-semibold">
                                    {offer.product.title}
                                  </h3>
                                  <p className="text-gray-500 text-sm">
                                    Oferta enviada el {format(new Date(offer.date), 'dd/MM/yyyy', { locale: es })}
                                  </p>
                                  <div className="flex items-center mt-2">
                                    <Avatar className="h-6 w-6 mr-2">
                                      <AvatarImage src={offer.otherUser.avatar} />
                                      <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm">{offer.otherUser.name}</span>
                                  </div>
                                </div>
                                <div className="mt-4 md:mt-0">
                                  <div className="text-lg font-semibold text-purple-600">
                                    ${offer.amount.toLocaleString('es-AR')}
                                  </div>
                                  <div className="flex items-center mt-1">
                                    {offer.status === 'accepted' ? (
                                      <div className="flex items-center text-green-600">
                                        <Check className="h-4 w-4 mr-1" />
                                        <span className="text-sm font-medium">Aceptada</span>
                                      </div>
                                    ) : offer.status === 'rejected' ? (
                                      <div className="flex items-center text-red-600">
                                        <X className="h-4 w-4 mr-1" />
                                        <span className="text-sm font-medium">Rechazada</span>
                                      </div>
                                    ) : (
                                      <div className="flex items-center text-amber-600">
                                        <Clock className="h-4 w-4 mr-1" />
                                        <span className="text-sm font-medium">Pendiente</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              
                              {/* Message */}
                              {offer.message && (
                                <div className="mt-4 border-t border-gray-100 pt-4">
                                  <p className="text-sm text-gray-700">Mensaje: "{offer.message}"</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No has enviado ofertas</p>
                  )}
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Ofertas recibidas</h3>
                  {offersReceived.length > 0 ? (
                    <div className="space-y-4">
                      {offersReceived.map((offer) => (
                        <Card key={offer.id} className="overflow-hidden">
                          <div className="flex flex-col md:flex-row">
                            {/* Product Image */}
                            <div className="w-full md:w-1/4 h-48 md:h-auto bg-gray-100">
                              <img 
                                src={offer.product.images[0]} 
                                alt={offer.product.title} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            
                            {/* Offer Details */}
                            <div className="flex-1 p-6">
                              <div className="flex flex-col md:flex-row md:justify-between">
                                <div>
                                  <h3 className="text-xl font-semibold">
                                    {offer.product.title}
                                  </h3>
                                  <p className="text-gray-500 text-sm">
                                    Oferta recibida el {format(new Date(offer.date), 'dd/MM/yyyy', { locale: es })}
                                  </p>
                                  <div className="flex items-center mt-2">
                                    <Avatar className="h-6 w-6 mr-2">
                                      <AvatarImage src={offer.otherUser.avatar} />
                                      <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm">{offer.otherUser.name}</span>
                                  </div>
                                </div>
                                <div className="mt-4 md:mt-0">
                                  <div className="text-lg font-semibold text-purple-600">
                                    ${offer.amount.toLocaleString('es-AR')}
                                  </div>
                                  <div className="flex items-center mt-1">
                                    {offer.status === 'accepted' ? (
                                      <div className="flex items-center text-green-600">
                                        <Check className="h-4 w-4 mr-1" />
                                        <span className="text-sm font-medium">Aceptada</span>
                                      </div>
                                    ) : offer.status === 'rejected' ? (
                                      <div className="flex items-center text-red-600">
                                        <X className="h-4 w-4 mr-1" />
                                        <span className="text-sm font-medium">Rechazada</span>
                                      </div>
                                    ) : (
                                      <div className="flex items-center text-amber-600">
                                        <Clock className="h-4 w-4 mr-1" />
                                        <span className="text-sm font-medium">Pendiente</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              
                              {/* Message */}
                              {offer.message && (
                                <div className="mt-4 border-t border-gray-100 pt-4">
                                  <p className="text-sm text-gray-700">Mensaje: "{offer.message}"</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No has recibido ofertas</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No hay ofertas para mostrar</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="resenas">
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src={mockUsers[(i + 2) % mockUsers.length].avatar} />
                        <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{mockUsers[(i + 2) % mockUsers.length].name}</h4>
                          <div className="flex text-yellow-500">
                            {[...Array(5)].map((_, starIndex) => (
                              <Star key={starIndex} className={`h-4 w-4 ${starIndex < 5 - i * 0.5 ? 'fill-current' : ''}`} />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Hace {i + 1} semana{i > 0 ? 's' : ''}</p>
                        <p className="mt-2">
                          {i === 0 ? 'Excelente vendedor, muy atento y el producto llegó en perfectas condiciones.' : 
                           i === 1 ? 'Todo genial, tal como se describe en la publicación. Recomendado!' : 
                           'Buena comunicación pero tardó un poco en enviar. El producto está perfecto.'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="vendidos">
            {soldProductsWithDetails.length > 0 ? (
              <div className="space-y-6">
                {soldProductsWithDetails.map((soldItem) => (
                  <Card key={soldItem.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      {/* Product Image */}
                      {soldItem.product && (
                        <div className="w-full md:w-1/4 h-48 md:h-auto bg-gray-100">
                          <img 
                            src={soldItem.product.images[0]} 
                            alt={soldItem.product.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      
                      {/* Product Details */}
                      <div className="flex-1 p-6">
                        <div className="flex flex-col md:flex-row md:justify-between">
                          <div>
                            <h3 className="text-xl font-semibold">
                              {soldItem.product ? soldItem.product.title : 'Producto vendido'}
                            </h3>
                            <p className="text-gray-500 text-sm">
                              Vendido el {new Date(soldItem.saleDate).toLocaleDateString('es-AR')}
                            </p>
                          </div>
                          <div className="mt-2 md:mt-0 text-lg font-semibold text-green-600">
                            ${soldItem.salePrice.toLocaleString('es-AR')}
                          </div>
                        </div>
                        
                        {/* Review */}
                        {soldItem.review && (
                          <div className="mt-4 border-t border-gray-100 pt-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <Avatar className="h-10 w-10 mr-3">
                                  <AvatarImage src={soldItem.buyer?.avatar} />
                                  <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{soldItem.buyer?.name}</p>
                                  <p className="text-sm text-gray-500">
                                    {new Date(soldItem.review.reviewDate).toLocaleDateString('es-AR')}
                                  </p>
                                </div>
                              </div>
                              <div className="flex text-yellow-500">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`h-4 w-4 ${i < soldItem.review.rating ? 'fill-current' : ''}`} 
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="mt-2 text-gray-700">"{soldItem.review.comment}"</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No hay productos vendidos con reseñas para mostrar</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
