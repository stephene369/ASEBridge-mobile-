import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from 'react-router-dom'
import { Button } from "../../components/ui/button"
import {
  Form, FormControl, FormField, FormItem, FormDescription, FormLabel, FormMessage,
} from "../../components/ui/form"
import { Input } from "../../components/ui/input"
import { useForm } from "react-hook-form"
import { SignupValidation } from '../../lib/validation'
import Loader from '../../components/shared/Loader'
import { useToast } from '../../hooks/use-toast'
import { useSignInAccount } from '../../lib/react-query/queriesAndMutations'
import { useUserContext } from '../../context/AuthContext'
import { useCreateUserAccount } from "../../lib/react-query/queriesAndMutations"
import logo from "/asebridge/assets/images/ase.png"

function SignupForm() {
  const { toast } = useToast()
  const navigate = useNavigate();

  const { mutateAsync: createUserAccount, isPending: isCreatingUser } = useCreateUserAccount();
  const { mutateAsync: signInAccount } = useSignInAccount();
  const { checkAuthUser } = useUserContext();



  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: '',
      username: "",
      email: "",
      password: ""
    },
  })

  // 2. Define a submit handler.
  // Handler
  const handleSignup = async (user: z.infer<typeof SignupValidation>) => {
    try {
      const newUser = await createUserAccount(user);

      if (!newUser) {
        toast({ title: "Sign up failed. Please try again.", });

        return;
      }

      const session = await signInAccount({
        email: user.email,
        password: user.password,
      });

      if (!session) {
        toast({ title: "Something went wrong. Please login your new account", });

        navigate("/asebridge/sign-in");

        return;
      }

      const isLoggedIn = await checkAuthUser();

      if (isLoggedIn) {
        form.reset();

        navigate("/asebridge/");
      } else {
        toast({ title: "Login failed. Please try again.", });

        return;
      }
    } catch (error) {
      console.log({ error });
    }
  };


  return (
    <Form {...form}>

      <div className="sm:w-420 flex-center flex-col m-16 pb-4">
        <img src={logo} alt="logo" width={190}/>
        <h2 className='h3-bold md:h2-bold pt-5 sm:pt-12'>Create new account</h2>
        <p className='text-light-5 text-center small-medium md:base-regular mt-2'>


          To start using ASE Com, enter your details to create an account and connect with current and former ASE students across the globe. Share updates, explore opportunities, and grow your network within the ASE community.

        </p>



        <form onSubmit={form.handleSubmit(handleSignup)} className="flex flex-col gap-5 w-full mt-1 ">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type='text' className='shad-input' {...field} />
                </FormControl>
                <FormDescription>
                  Your real name
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type='text' className='shad-input' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type='email' className='shad-input' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type='text' className='shad-input' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className='shad-button_primary' >
            {isCreatingUser ? (
              <div className='flex-center gap-2'>
                <Loader /> Loading...
              </div>
            ) : "Sign up"}
          </Button>
          <p className="text-small-regular text-light-2 text-center">
            Already have an account? <Link className='text-primary-500 text-small-semibold ml-1' to='/asebridge/sign-in'>Log in</Link>
          </p>
        </form>
      </div>
    </Form>

  )


} export default SignupForm;