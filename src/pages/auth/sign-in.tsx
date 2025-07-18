import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useNavigate, Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { useAuth } from '@/middlewares/auth-provider'

const signInForm = z.object({
  email: z.string().email(),
  password: z.string()
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting }
  } = useForm<SignInForm>()

  const email = watch('email')
  const password = watch('password')
  const isFormFilled = Boolean(email && password)

  async function handleSignIn(data: SignInForm) {
    try {
      console.log(data)

      // Simula chamada API
      await new Promise(resolve => setTimeout(resolve, 2000))

      toast.success('Login realizado com sucesso!')
      navigate('/')
    } catch {
      toast.error('Credenciais inválidas')
    }
  }

  function handleLoginAsStudent() {
    login('student')
    toast.success('Logado como Aluno')
  }

  function handleLoginAsAdvisor() {
    login('advisor')
    toast.success('Logado como Orientador')
  }

  function handleLoginAsArticulator() {
    login('articulator')
    toast.success('Logado como Articulador')
  }

  return (
    <>
      <Helmet title='Login' />

      <div className='p-8'>

        <Button asChild variant="ghost" className="absolute right-8 top-8">
          <Link to="/sign-up">
            Novo usuário
          </Link>
        </Button>

        <div className='w-[350px] flex flex-col justify-center gap-6'>
          <div className='flex flex-col gap-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight'>Acessar sua conta</h1>
            <p className='text-sm text-muted-foreground'>Acesse o seu ambiente de estágio!</p>
          </div>

          <form onSubmit={handleSubmit(handleSignIn)} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='email'>Seu e-mail</Label>
              <Input
                id='email'
                type='email'
                {...register('email')}
              />

              <Label htmlFor='password'>Sua senha</Label>
              <Input
                id='password'
                type='password'
                {...register('password')}
              />
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <Button
                disabled={!isFormFilled || isSubmitting}
                onClick={handleLoginAsStudent}
                variant="default"
              >
                Entrar como Aluno
              </Button>
              <Button
                disabled={!isFormFilled || isSubmitting}
                onClick={handleLoginAsAdvisor}
                variant="default"
              >
                Entrar como Orientador
              </Button>
              <Button
                disabled={!isFormFilled || isSubmitting}
                onClick={handleLoginAsArticulator}
                variant="default"
              >
                Entrar como Articulador
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
