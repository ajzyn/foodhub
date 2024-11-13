'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { useForm, FormProvider } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useToast } from '@/hooks/use-toast'
import FormSection from '@/components/form-section'
import { FormTextField } from '@/components/form-fields/text-field'
import { FormSelectField } from '@/components/form-fields/select'
import { FormNumberField } from '@/components/form-fields/number'
import { FormTextareaField } from '@/components/form-fields/textarea'
import { PRODUCT_CATEGORIES } from './types'
import { Product } from '@prisma/client'
import { productSchema } from '@/api/schemas/product'
import { addProduct } from '@/api/products'

export default function ProductForm({ product }: { product?: Product }) {
  const { toast } = useToast()
  const methods = useForm<Product>({
    resolver: zodResolver(productSchema),
    defaultValues: product ?? {
      minOrder: 0,
      price: 0
    }
  })

  const { mutate: createProduct, isPending } = useMutation({
    mutationFn: (data: Product) => {
      return addProduct(data)
    },
    onSuccess: () => {
      toast({
        title: 'Sukces',
        description: 'Produkt został pomyślnie utworzony'
      })
      methods.reset()
    },
    onError: (error) => {
      console.log('piasdasd')
      toast({
        variant: 'destructive',
        title: 'Błąd',
        description: error.message
      })
      console.error(error)
    }
  })

  const onSubmit = async (data: Product) => {
    createProduct(data)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormSection title="Szczegóły produktu">
          <FormTextField name="name" label="Nazwa produktu" placeholder="Wprowadź nazwę produktu" />
          <FormSelectField name="category" label="Kategoria" options={PRODUCT_CATEGORIES} />
          <FormTextareaField name="description" label="Opis" placeholder="Wprowadź opis produktu" />
        </FormSection>

        <FormSection title="Informacje o cenie">
          <FormNumberField name="price" label="Cena" min={0} step="0.01" />
          <FormTextField name="bulkPrice" label="Cena hurtowa" placeholder="Wprowadź cenę hurtową" />
        </FormSection>

        <FormSection title="Informacje o zamówieniu">
          <FormNumberField name="minOrder" label="Minimalne zamówienie" min={0} step="1" />
          <FormTextField name="leadTime" label="Czas realizacji" placeholder="Wprowadź czas realizacji" />
        </FormSection>

        <FormSection title="Certyfikaty">
          <FormTextField name="certifications" label="Certyfikaty" placeholder="Wprowadź certyfikaty" />
        </FormSection>

        <div className="flex justify-end gap-2 max-w-2xl mx-auto my-6">
          <Button variant="outline" type="button">
            Cancel
          </Button>
          <Button type="submit">{isPending ? 'Adding...' : 'Add Product'}</Button>
        </div>
      </form>
    </FormProvider>
  )
}
