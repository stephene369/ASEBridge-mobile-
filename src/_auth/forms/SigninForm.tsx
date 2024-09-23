import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from 'react-router-dom'
import { Button } from "../../components/ui/button"
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "../../components/ui/form"
import { Input } from "../../components/ui/input"
import { useForm } from "react-hook-form"
import { SigninValidation } from '../../lib/validation'
import Loader from '../../components/shared/Loader'
import { useToast } from '../../hooks/use-toast'
import { useSignInAccount } from '../../lib/react-query/queriesAndMutations'
import { useUserContext } from '../../context/AuthContext'
import logo from "/asebridge/assets/images/ase.png"


const SigninForm = () => {

  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  // Query
  const { mutateAsync: signInAccount, isPending } = useSignInAccount();

  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignin = async (user: z.infer<typeof SigninValidation>) => {
    try {
      const session = await signInAccount(user);

      if (!session) {
        toast({ title: "Login failed. Please try again." });
        navigate("/asebridge/sign-in")
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
    } catch {
      navigate("/asebridge/sign-in")
    }

  };

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col m-16">
        <img src={logo} alt="logo"
          width={190}
        />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Log in to your account
        </h2>
        <p className="text-small-regular text-light-2 text-center mt-2">

          Don't have an account?
          <Link
            to="/asebridge/sign-up"
            className="text-blue-900 text-small-semibold ml-1">
            Sign up
          </Link>
        </p>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          Welcome back! Please sign in to join the community.
        </p>
        <p className='text-light-5 text-center small-medium md:base-regular mt-2'>
          This is a beta version, and we would greatly appreciate your feedback.
        </p>
        <form
          onSubmit={form.handleSubmit(handleSignin)}
          className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Email</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
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
                <FormLabel className="shad-form_label">Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="shad-button_primary">
            {isPending || isUserLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Log in"
            )}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">

            Don't have an account?
            <Link
              to="/asebridge/sign-up"
              className="text-primary-500 text-small-semibold ml-1">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SigninForm;