import { getApiUrl } from '@/configs/global';

interface FetchOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: any;
    headers?: Record<string, string>;
    isFormData?: boolean;
    /** Seconds for Next.js fetch cache. Use false/undefined for no-store (default). */
    revalidate?: number | false;
    /** Next.js cache tags for on-demand revalidation. */
    tags?: string[];
}

const baseFetchPublic = async <T>(
    url: string,
    options: FetchOptions = {}
): Promise<T> => {
    const {
        method = 'GET',
        body,
        headers: customHeaders = {},
        isFormData = false,
        revalidate,
        tags,
    } = options;

    const baseHeaders: Record<string, string> = {
        'Accept': 'application/json',
        ...customHeaders
    };

    if (!isFormData) {
        baseHeaders['Content-Type'] = 'application/json';
    }

    const requestBody = body && !isFormData ? JSON.stringify(body) : body;

    const nextOptions: { revalidate?: number | false; tags?: string[] } = {};
    if (typeof revalidate === 'number' || revalidate === false) {
        nextOptions.revalidate = revalidate;
    }
    if (tags?.length) {
        nextOptions.tags = tags;
    }

    const cacheOptions =
        tags?.length || typeof revalidate === 'number' || revalidate === false
            ? { next: nextOptions }
            : { cache: 'no-store' as const };

    const res = await fetch(`${getApiUrl()}${url}`, {
        ...cacheOptions,
        method,
        headers: baseHeaders,
        ...(requestBody && { body: requestBody })
    });
    return await res.json();
};

const getFetch = async <T>(
    url: string,
    options?: { revalidate?: number | false; tags?: string[] }
): Promise<T> => {
    const res = await baseFetchPublic<T>(url, {
        method: 'GET',
        revalidate: options?.revalidate,
        tags: options?.tags,
    });
    if (res) {
        return res;
    } else {
        throw new Error(`مشکل در دریافت اطلاعات`);
    }
};

const postFetch = async <T>(
    url: string,
    body: any,
    options?: { revalidate?: number | false; tags?: string[] }
): Promise<T> => {
    return baseFetchPublic<T>(url, {
        method: 'POST',
        body,
        revalidate: options?.revalidate,
        tags: options?.tags,
    });
};

const postFormData = async <T>(url: string, formData: FormData): Promise<T> => {
    return baseFetchPublic<T>(url, {
        method: 'POST',
        body: formData,
        isFormData: true
    });
};

export {
    baseFetchPublic,
    getFetch,
    postFetch,
    postFormData
};
