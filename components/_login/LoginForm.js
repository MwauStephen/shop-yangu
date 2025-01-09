"use client";
import React, { useEffect, useState } from "react";
import { Card, Input, Button, Flex, Text, Box } from "@chakra-ui/react";
import { Field } from "../ui/field";
import Logo from "../Logo";
import { PasswordInput } from "../ui/password-input";

import toast from "react-hot-toast";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //handler function for form submission
  const handleLogin = (e) => {
    console.log(email, password);
    e.preventDefault();
    if (email === "admin@example.com" && password === "admin") {
      localStorage.setItem("isAuthenticated", "true");
      toast.success("Login successful");
      window.location.href = "/";
    } else {
      toast.error("Invalid credentials");
    }
  };

  //handler fuunction to populate admin credentials
  const populateAdminCredentials = () => {
    setEmail("admin@example.com");
    setPassword("admin");
  };

  return (
    <Flex
      justify="center"
      align="center"
      h="100vh"
      as="form"
      onSubmit={handleLogin}
    >
      <Card.Root p="2rem" w="500px" mx="auto" spaceY={2} boxShadow="md">
        <Logo />
        <Field label="Email or Username">
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </Field>
        <Field label="Password" fontWeight="bold">
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>
        <Button
          bgGradient="to-r"
          gradientFrom="#0da487"
          gradientTo="#20c997"
          type="submit"
        >
          Login
        </Button>
        <Box textAlign="left">
          <Button variant="link" onClick={populateAdminCredentials}>
            Login as a guest
          </Button>
        </Box>
      </Card.Root>
    </Flex>
  );
};

export default LoginForm;
