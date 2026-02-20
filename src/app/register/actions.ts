'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const registerSchema = z.object({
  fullName: z.string().min(2, 'El nombre es muy corto'),
  license: z.string().min(1, 'La cédula es requerida'),
  specialty: z.string().min(1, 'La especialidad es requerida'),
  state: z.string().min(1, 'El estado es requerido'),
  experience: z.string().min(1, 'La experiencia es requerida'),
  interest: z.string().min(1, 'El interés es requerido'),
  email: z.string().email('Correo inválido'),
  phone: z.string().min(10, 'Número inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
})

export type RegisterState = {
  message?: string
  errors?: {
    [key: string]: string[]
  }
}

export async function signup(prevState: RegisterState, formData: FormData): Promise<RegisterState> {
  const rawData = {
    fullName: formData.get('fullName'),
    license: formData.get('license'),
    specialty: formData.get('specialty'),
    state: formData.get('state'),
    experience: formData.get('experience'),
    interest: formData.get('interest'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    password: formData.get('password'),
  }

  const validatedFields = registerSchema.safeParse(rawData)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Por favor revisa los campos.',
    }
  }

  const { email, password, fullName, license, specialty, state, experience, interest, phone } = validatedFields.data
  const supabase = await createClient()

  // Include metadata for the profile trigger
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        license_id: license,
        specialty,
        state,
        experience_level: experience,
        interest_area: interest,
        phone,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/callback`,
    },
  })

  if (error) {
    console.error('Supabase SignUp Error:', error)
    return {
      message: error.message,
    }
  }

  // Redirect to verification page
  redirect('/register/verify')
}
