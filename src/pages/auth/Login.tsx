import { Form, Input } from '@/components'
import { ROUTES, initialFormLogin } from '@/constants'
import { useAuth, useForm } from '@/hooks'
import { UserAndRol } from '@/index'
import { loginSchema } from '@/schemas'
import { loginUser } from '@/services'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader
} from '@nextui-org/react'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth() ?? {}
  const { mutate, data, isLoading, isSuccess, isError } = useMutation({
    mutationFn: loginUser
  })

  const { methods } = useForm({
    initialForm: initialFormLogin,
    schema: loginSchema
  })
  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    mutate(data as UserAndRol)
  }

  useEffect(() => {
    if (isSuccess && !isError) {
      login(data)
      navigate(ROUTES.orders.default)
    }
  }, [isSuccess])

  return (
    <div className="flex justify-center items-center h-screen bg-login ">
      <Form formMethods={methods} onSubmit={handleSubmit}>
        <Card className="max-w-3xl sm:w-96">
          <CardHeader className="text-lg font-semibold justify-center">
            Ingresa tus crendenciales
          </CardHeader>
          <CardBody>
            <div className="flex gap-4 flex-col w-full">
              <Input label="Usuario" name="user" required />
              <Input
                label="Contraseña"
                name="password"
                required
                type="password"
              />
            </div>
          </CardBody>
          <CardFooter className="flex justify-center">
            <Button
              isLoading={isLoading}
              type="submit"
              variant="ghost"
              color="secondary"
            >
              Ingresar
            </Button>
          </CardFooter>
        </Card>
      </Form>
    </div>
  )
}

export default Login
