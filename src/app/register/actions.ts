<<<<<<< HEAD
'use server'
=======
"use server"
>>>>>>> origin/main

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { z } from 'zod'

<<<<<<< HEAD
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
=======
const RegisterSchema = z.object({
  fullName: z.string().min(3, "El nombre es muy corto"),
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Mínimo 8 caracteres"),
  phone: z.string().min(10, "Teléfono inválido"),
  licenseId: z.string().min(5, "Cédula inválida"),
  specialty: z.string(),
  state: z.string(),
  experience: z.string(),
  interestArea: z.string(),
>>>>>>> origin/main
})

export type RegisterState = {
  message?: string
  errors?: {
    [key: string]: string[]
  }
}

export async function signup(prevState: RegisterState, formData: FormData): Promise<RegisterState> {
<<<<<<< HEAD
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
=======
  const supabase = await createClient()

  const rawData = {
    fullName: formData.get('fullName') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    phone: formData.get('phone') as string,
    licenseId: formData.get('licenseId') as string,
    specialty: formData.get('specialty') as string,
    state: formData.get('state') as string,
    experience: formData.get('experience') as string,
    interestArea: formData.get('interest') as string,
  }

  const validatedFields = RegisterSchema.safeParse(rawData)
>>>>>>> origin/main

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
<<<<<<< HEAD
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
=======
      message: "Por favor revisa los campos.",
    }
  }

  const { error, data } = await supabase.auth.signUp({
    email: rawData.email,
    password: rawData.password,
    options: {
      data: {
        full_name: rawData.fullName,
        license_id: rawData.licenseId,
        specialty: rawData.specialty,
        state: rawData.state,
        experience_level: rawData.experience,
        interest_area: rawData.interestArea,
        phone: rawData.phone,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
>>>>>>> origin/main
    },
  })

  if (error) {
<<<<<<< HEAD
    console.error('Supabase SignUp Error:', error)
=======
    console.error('SupabaseSignUp Error:', error)
>>>>>>> origin/main
    return {
      message: error.message,
    }
  }

<<<<<<< HEAD
  // Redirect to verification page
=======
>>>>>>> origin/main
  redirect('/register/verify')
}
