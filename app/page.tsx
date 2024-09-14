'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/app/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/ui/card'
import { Github, Linkedin, Twitter, ChevronLeft, ChevronRight, Globe } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/ui/dropdown-menu"

const FadeInWhenVisible = ({ children }: { children: React.ReactNode }) => {
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ duration: 0.3 }}
      variants={{
        visible: { opacity: 1, scale: 1 },
        hidden: { opacity: 0, scale: 0.95 }
      }}
    >
      {children}
    </motion.div>
  )
}

const FeatureCarousel = ({ features }: { features: { title: string; image: string; description: string }[] }) => {
  const [currentFeature, setCurrentFeature] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined
    if (isHovering) {
      interval = setInterval(() => {
        setCurrentFeature((prev) => (prev + 1) % features.length)
      }, 3000) // Change feature every 3 seconds on hover
    }
    return () => clearInterval(interval)
  }, [isHovering, features.length])

  return (
    <div
      className="relative w-full max-w-3xl mx-auto"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="overflow-hidden">
        <motion.div
          className="flex"
          animate={{ x: `${-currentFeature * 100}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {features.map((feature, index) => (
            <Card key={index} className="w-full flex-shrink-0 bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-green-300">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Image
                  src={feature.image}
                  alt={`${feature.title} screenshot`}
                  width={1500}
                  height={400}
                  className="rounded-lg mb-0 mx-auto"
                />
                <CardDescription className="text-green-300">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-green-400 hover:text-green-300"
        onClick={() => setCurrentFeature((prev) => (prev - 1 + features.length) % features.length)}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-green-400 hover:text-green-300"
        onClick={() => setCurrentFeature((prev) => (prev + 1) % features.length)}
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  )
}

export default function LandingPage() {
  const features = [
    {
      title: "AI generated responses",
      description: "Generate your readme using AI.",
      image: "/ai.png?height=400&width=300"
    },
    {
      title: "Preview Contents of your file",
      description: "See  your readme in real-time as you edit it.",
      image: "/preview.png?height=400&width=300"
    },
    {
      title: "Add Sections",
      description: "Add more sections to your readme.",
      image: "/addsection.png?height=400&width=300"
    },
    {
      title: "Download your readme",
      description: "Download your readme as an markdown file locally.",
      image: "/download.png?height=400&width=300"
    }

  ]

  return (
    <div className="flex flex-col min-h-screen font-mono text-green-400 bg-gray-900">
      <header className="sticky top-0 z-50 w-full border-b border-gray-700 bg-gray-800/95 backdrop-blur supports-[backdrop-filter]:bg-gray-800/60">
        <div className="container flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Image
                src="/logo.png"
                alt="READMEaker Logo"
                width={32}
                height={32}
              />
            </motion.div>
            <span className="font-bold text-xl">READMEaker</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
              <Link href="#features" className="transition-colors hover:text-green-300">Features</Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
              <Link href="#about" className="transition-colors hover:text-green-300">About</Link>
            </motion.div>
          </nav>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.button
                whileHover={{ rotate: 20 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full hover:bg-gray-700"
              >
                <Globe className="h-5 w-5" />
              </motion.button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>Español</DropdownMenuItem>
              <DropdownMenuItem>Français</DropdownMenuItem>
              <DropdownMenuItem>中文</DropdownMenuItem>
              <DropdownMenuItem>हिन्दी</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <main className="flex-1">
        <FadeInWhenVisible>
          <section className="relative w-full h-screen flex items-center justify-center">
            <Image
              src="/hero.jpeg"
              alt="Project Cover Image"
              layout="fill"
              objectFit="cover"
              priority
              className="absolute inset-0 z-0"
            />
            <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
            <div className="relative z-20 text-center text-green-400">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none mb-4"
              >
                READMEaker
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mx-auto max-w-[700px] text-xl mb-8"
              >
                Generate your professional README files with ease.
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-green-500 text-black hover:bg-green-400"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href="/ReadMeaker">Get Started</Link>
                  </motion.div>
                </Button>
              </motion.div>
            </div>
          </section>
        </FadeInWhenVisible>

        <FadeInWhenVisible>
          <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-800">
            <div className="container px-4 md:px-6 flex flex-col items-center text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-orange-600">
                Key Features
              </h2>
              <FeatureCarousel features={features} />
            </div>
          </section>
        </FadeInWhenVisible>

        <FadeInWhenVisible>
          <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-gray-900">
            <div className="container px-4 md:px-6 flex flex-col items-center text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-orange-500">
                About the ReadMeaker
              </h2>
              <div className="grid gap-12 lg:grid-cols-1 items-center justify-cente">
                <div className="text-center lg:text-center flex flex-col items-center">
                  <h3 className="text-2xl font-bold mb-4 text-green-400">My Inspiration</h3>
                  <p className="text-green-300 mb-4">
                    This project was born out of a personal experience. As a software engineer, I often find myself spending considerable time crafting README files for my projects. I realized that this process, while crucial, was often time-consuming and repetitive.
                  </p>
                  <p className="text-green-300 mb-4">
                    Inspired by this challenge, I embarked on creating READMEaker as part of my Portfolio Project for Holberton School. What started as an assignment quickly evolved into a passion project, driven by my desire to streamline the README creation process for developers worldwide.
                  </p>
                  <p className="text-green-300">
                    READMEaker is more than just a tool; it is my contribution to the developer community, aiming to save time and improve project documentation across the board. I believe that with READMEaker, I can make a real difference in how developers approach and create their project documentation.
                  </p>
                  <h3 className="text-2xl font-bold mb-4 text-green-400">Meet Mike</h3>
                  <p className="text-green-300 mb-4">
                    I am a passionate full-stack developer with a keen interest in creating tools that enhance developer productivity. With a background in software engineering and experience in web development, I bring a wealth of knowledge and creativity to the READMEaker project.
                  </p>
                  <div className="flex justify-center lg:justify-start space-x-4 mt-4">
                    <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                      <Link href="https://github.com/machage9603" className="text-green-400 hover:text-black-300">
                        <Github className="h-6 w-6" />
                        <span className="sr-only">GitHub</span>
                      </Link>
                    </motion.div>
                    <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                      <Link href="https://www.linkedin.com/in/mike-machage/" className="text-green-400 hover:text-blue-300">
                        <Linkedin className="h-6 w-6" />
                        <span className="sr-only">LinkedIn</span>
                      </Link>
                    </motion.div>
                    <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                      <Link href="https://twitter.com/sermachage" className="text-green-400 hover:text-green-300">
                        <Twitter className="h-6 w-6" />
                        <span className="sr-only">Twitter</span>
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
              <div className="mt-12 text-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="https://github.com/machage9603/readmeaker" className="text-yellow-400 hover:underline">
                    View Project on GitHub
                  </Link>
                </motion.div>
              </div>
            </div>
          </section>
        </FadeInWhenVisible>
      </main>

      <footer className="w-full py-6 bg-gray-800">
        <div className="container px-4 md:px-6">
          <p className="text-center text-sm text-green-400">
            © 2024 READMEaker. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}