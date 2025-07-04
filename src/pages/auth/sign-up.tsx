import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Link } from 'react-router-dom'

const signInForm = z.object({
    email: z.string().email(),
    password: z.string()
})

type SignInForm = z.infer<typeof signInForm>

export function SignUp() {

    const {
        register,
        handleSubmit,
        formState: { isSubmitting }
    } = useForm<SignInForm>()

    async function handleSignIn(data: SignInForm) {
        try {
            console.log(data)

            await new Promise(resolve => setTimeout(resolve, 2000))

            toast.success('Enviado link de autenticação', {
                action: {
                    label: 'Reenviar',
                    onClick: () => handleSignIn(data)
                }
            })
        } catch {
            toast.error('Credenciais inválidas')
        }
    }

    return (
        <>
            <Helmet title='Login' />

            <div className='p-8'>

                <Button asChild variant="ghost" className="absolute right-8 top-8">
                    <Link to="/sign-in" >
                        Fazer login
                    </Link>
                </Button>

                <div className='w-[350px] flex flex-col justify-center gap-6'>
                    <div className='flex flex-col gap-2 text-center'>
                        <h1 className='text-2xl font-semibold tracking-tight'>Cadastre-se</h1>

                        <p className='text-sm text-muted-foreground'>Faça a sua conta e conquiste sua vaga!</p>
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

                        <Button disabled={isSubmitting} type='submit' className='w-full'>Acessar aplicação</Button>
                    </form>

                </div>
            </div>

        </>
    )
}