import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Info, UploadCloud } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

// Define form schema with Zod
const formSchema = z.object({
  title: z.string().min(10, 'El título debe tener al menos 10 caracteres'),
  description: z.string().min(30, 'La descripción debe tener al menos 30 caracteres'),
  price: z.coerce.number().positive('El precio debe ser mayor a 0'),
  condition: z.enum(['Nuevo', 'Como nuevo', 'Muy bueno', 'Bueno', 'Aceptable']),
  category: z.string(),
  brand: z.string().optional(),
  location: z.string(),
  enableAutomaticOffers: z.boolean().default(false),
  minOfferPrice: z.coerce.number().optional(),
  acceptedOfferMessage: z.string().optional(),
  rejectedOfferMessage: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface PublishProductFormProps {
  onSubmit: (data: FormValues) => void;
  isEditing?: boolean;
  initialValues?: Partial<FormValues>;
}

const PublishProductForm = ({
  onSubmit,
  isEditing = false,
  initialValues,
}: PublishProductFormProps) => {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [enableAutoOffers, setEnableAutoOffers] = useState(initialValues?.enableAutomaticOffers || false);

  // Default values for the form
  const defaultValues: Partial<FormValues> = {
    title: '',
    description: '',
    price: undefined,
    condition: 'Nuevo',
    category: '',
    brand: '',
    location: 'Buenos Aires, CABA',
    enableAutomaticOffers: false,
    minOfferPrice: undefined,
    acceptedOfferMessage: 'Gracias por tu oferta. ¡Aceptada! Podemos coordinar la entrega cuando gustes.',
    rejectedOfferMessage: 'Gracias por tu interés, pero tu oferta está por debajo del mínimo aceptable.',
    ...initialValues,
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: 'onChange',
  });

  const handleSubmit = (values: FormValues) => {
    if (uploadedImages.length === 0) {
      toast({
        title: 'Error',
        description: 'Debes subir al menos una imagen',
        variant: 'destructive',
      });
      return;
    }
    
    // If automatic offers are disabled, remove those fields
    if (!values.enableAutomaticOffers) {
      values.minOfferPrice = undefined;
      values.acceptedOfferMessage = undefined;
      values.rejectedOfferMessage = undefined;
    }
    
    onSubmit({
      ...values,
      // Add uploaded images if this was a real implementation
    });
  };

  // Simulate image upload
  const handleImageUpload = () => {
    // In a real app, this would open a file picker and upload images
    // For the demo, we'll add a placeholder image
    const newImage = 'https://images.unsplash.com/photo-1603891128711-11b4b03bb138?q=80&w=2574&auto=format&fit=crop';
    setUploadedImages([...uploadedImages, newImage]);
    
    toast({
      title: 'Imagen subida',
      description: 'La imagen se ha subido correctamente',
    });
  };

  const removeImage = (index: number) => {
    const newImages = [...uploadedImages];
    newImages.splice(index, 1);
    setUploadedImages(newImages);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        {isEditing ? 'Editar Publicación' : 'Crear Nueva Publicación'}
      </h1>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Información del producto</h2>
              
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input placeholder="iPhone 13 Pro Max 128GB" {...field} />
                    </FormControl>
                    <FormDescription>
                      Un título claro y descriptivo ayuda a vender más rápido
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe tu producto con detalle..." 
                        className="min-h-32"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Incluye estado, tiempo de uso, detalles importantes, etc.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          
          {/* Price Information */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Precio y detalles</h2>
              
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Precio de publicación</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                        <Input type="number" placeholder="100000" className="pl-8" {...field} />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Precio en pesos argentinos
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <FormField
                  control={form.control}
                  name="condition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona el estado" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Nuevo">Nuevo</SelectItem>
                          <SelectItem value="Como nuevo">Como nuevo</SelectItem>
                          <SelectItem value="Muy bueno">Muy bueno</SelectItem>
                          <SelectItem value="Bueno">Bueno</SelectItem>
                          <SelectItem value="Aceptable">Aceptable</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoría</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona una categoría" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Tecnología">Tecnología</SelectItem>
                          <SelectItem value="Ropa">Ropa</SelectItem>
                          <SelectItem value="Hogar">Hogar</SelectItem>
                          <SelectItem value="Deportes">Deportes</SelectItem>
                          <SelectItem value="Vehículos">Vehículos</SelectItem>
                          <SelectItem value="Juguetes">Juguetes</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>Marca (opcional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Apple, Samsung, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>Ubicación</FormLabel>
                    <FormControl>
                      <Input placeholder="Ciudad, Provincia" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          
          {/* Images */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Imágenes</h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                {uploadedImages.map((image, index) => (
                  <div key={index} className="relative group aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <img src={image} alt={`Uploaded ${index+1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={handleImageUpload}
                  className="aspect-square flex flex-col items-center justify-center border-2 border-dashed rounded-lg border-gray-300 hover:border-gray-400 transition-colors"
                >
                  <UploadCloud className="h-8 w-8 text-gray-500 mb-2" />
                  <span className="text-sm text-gray-500">Añadir imagen</span>
                </button>
              </div>
              
              <p className="text-sm text-gray-500">
                Sube hasta 8 imágenes. La primera será la principal.
              </p>
            </CardContent>
          </Card>
          
          {/* Automatic Offers */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Configuración de ofertas</h2>
              
              <FormField
                control={form.control}
                name="enableAutomaticOffers"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Ofertas automáticas</FormLabel>
                      <FormDescription>
                        Acepta o rechaza ofertas automáticamente según el precio
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={(value) => {
                          field.onChange(value);
                          setEnableAutoOffers(value);
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              {enableAutoOffers && (
                <div className="space-y-4 mt-6 border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-start gap-2 text-sm text-blue-600 bg-blue-50 p-3 rounded-md">
                    <Info className="h-5 w-5 flex-shrink-0" />
                    <p>Las ofertas por debajo del precio mínimo se rechazarán automáticamente, ahorrándote tiempo en la negociación.</p>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="minOfferPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Precio mínimo para ofertas</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                            <Input 
                              type="number" 
                              placeholder="80000" 
                              className="pl-8" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Ofertas por debajo de este precio serán rechazadas automáticamente
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="acceptedOfferMessage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mensaje automático para ofertas aceptadas</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Gracias por tu oferta..."
                            className="min-h-24"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Este mensaje se enviará automáticamente cuando una oferta sea aceptada
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="rejectedOfferMessage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mensaje automático para ofertas rechazadas</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Lo siento, tu oferta..."
                            className="min-h-24"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Este mensaje se enviará automáticamente cuando una oferta sea rechazada
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Submit */}
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline">
              Cancelar
            </Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              {isEditing ? 'Actualizar publicación' : 'Publicar producto'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PublishProductForm;
