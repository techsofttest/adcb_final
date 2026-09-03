import { NextRequest, NextResponse } from "next/server";

const raw =
  process.env.NEXT_PUBLIC_API_URL ??
  "https://admin.adcbind.com/api";

const BACKEND = raw.replace(/\/api\/?$/, "");

async function proxy(req: NextRequest, params: { slug: string[] }) {
  const path = params.slug.join("/");
  const url = `${BACKEND}/api/v1/${path}${req.nextUrl.search}`;

  try {
    const headers = new Headers();
    req.headers.forEach((value, key) => {
      if (key !== "host" && key !== "connection") {
        headers.set(key, value);
      }
    });

    const init: RequestInit = {
      method: req.method,
      headers,
    };

    if (req.method !== "GET" && req.method !== "HEAD") {
      init.body = await req.arrayBuffer();
    }

    const res = await fetch(url, init);

    const responseHeaders = new Headers();
    res.headers.forEach((value, key) => {
      if (key !== "transfer-encoding") {
        responseHeaders.set(key, value);
      }
    });

    return new NextResponse(res.body, {
      status: res.status,
      headers: responseHeaders,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Proxy failed", detail: String(error), url },
      { status: 502 }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  return proxy(req, await params);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  return proxy(req, await params);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  return proxy(req, await params);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  return proxy(req, await params);
}
