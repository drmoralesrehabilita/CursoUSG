"use server"

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { z } from 'zod'

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
})

export type RegisterState = {
  message?: string
  errors?: {
    [key: string]: string[]
  }
}

export async function signup(prevState: RegisterState, formData: FormData): Promise<RegisterState> {
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

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
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
    },
  })

  if (error) {
    console.error('SupabaseSignUp Error:', error)
    return {
      message: error.message,
    }
  }

  redirect('/register/verify')
}
