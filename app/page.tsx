import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { cookies } from "next/headers";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Database } from "@/lib/database.types";

const supabase = createServerComponentClient<Database>({ cookies }); //SCで呼び出す場合にはcookiesを引数に呼び出す必要がある。※SSR

const getAllLessons =  async () => {
  const { data: lessons } = await supabase.from("lesson").select("*");
  return lessons; 
}

export default async function Home() {
  const lessons = await getAllLessons();

  return (
    <main className="w-full max-w-3xl mx-auto my-16 px-2">
      <div className="flex flex-col gap-3">
      {lessons?.map((Lesson) => (
        <Link href={`/${Lesson.id}`} key={Lesson.id}>
          <Card>
            <CardHeader>
              <CardTitle>{Lesson.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{Lesson.description}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
      </div>
    </main>
  );
}
