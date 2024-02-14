import fs from "fs"
import path from "path"

import ChakraUIRenderer from "chakra-ui-markdown-renderer"
import type { GetStaticProps, InferGetStaticPropsType } from "next"
import matter from "gray-matter"
import gfm from "remark-gfm"
import ReactMarkdown from "react-markdown"
import {
  Box,
  type BoxProps,
  Container as ChakraContainer,
  Heading,
} from "@chakra-ui/react"

import { PageMetadata } from "@/components/PageMetadata"
import { MdComponents } from "@/components/MdComponents"

import { RESOURCES_MARKDOWN_PATH } from "@/lib/constants"

const Container = (props: BoxProps) => (
  <ChakraContainer maxW="container.md" {...props} />
)

type Props = { content: string }

export const getStaticProps = (async () => {
  const contentPath = path.join(process.cwd(), RESOURCES_MARKDOWN_PATH)
  if (!fs.existsSync(contentPath))
    throw new Error("Resources markdown file not found")
  const file = fs.readFileSync(contentPath, "utf-8")
  const { content } = matter(file)
  return { props: { content } }
}) satisfies GetStaticProps<Props>

const Resources = ({
  content,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <PageMetadata title="Resources" description="Informational resources related to Ethereal Forest" />

      <Box as="main" maxW="container.lg" mx="auto">
        <Container>
          <Heading
            as="h1"
            fontSize="4xl"
            fontWeight="bold"
            letterSpacing="wide"
            textTransform="uppercase"
            color="body"
            pt={{ base: "8", md: "12" }}
          >
            Resources
          </Heading>

          <ReactMarkdown
            components={ChakraUIRenderer(MdComponents)}
            remarkPlugins={[gfm]}
          >
            {content}
          </ReactMarkdown>
        </Container>
      </Box>
    </>
  )
}

export default Resources
