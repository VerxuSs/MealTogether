import type { FC } from "react";

import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";

import { Form, Link, redirect } from "@remix-run/react";

import { Type } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

import Input from "~/client/components/commons/forms/Input";
import Submit from "~/client/components/commons/forms/Submit";

export const meta: MetaFunction = () => {
  return [
    {
      title: "Register",
    },
  ];
};

const ActionBody = Type.Object({
  email: Type.String({
    format: "email",
  }),
  password: Type.String({
    minLength: 8,
  }),
});

export const action = async ({ request }: ActionFunctionArgs) => {
  const form = await request.formData();

  const body = Value.Decode(ActionBody, form.entries());

  console.log("register", body);

  // TODO: Implement register logic here

  return redirect("/identity/register");
};

const PageComponent: FC = () => {
  return (
    <section className="m-auto">
      <Form method="POST">
        <div className="flex gap-y-3">
          <Input type="text" name="email" placeholder="Email" />
          <Input type="password" name="password" placeholder="Password" />
        </div>
        <div>
          <Submit>Register</Submit>
        </div>
      </Form>
      <Link
        to={{
          pathname: "/identity/login",
        }}
      >
        Login
      </Link>
    </section>
  );
};

export default PageComponent;
