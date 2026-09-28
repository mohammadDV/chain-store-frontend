import { getApiUrl } from '@/configs/global';

interface FetchOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: any;
    headers?: Record<string, string>;
    isFormData?: boolean;
    /** Seconds for Next.js fetch cache. Use false/undefined for no-store (default). */
    revalidate?: number | false;
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
    } = options;

    const baseHeaders: Record<string, string> = {
        'Accept': 'application/json',
        ...customHeaders
    };

    if (!isFormData) {
        baseHeaders['Content-Type'] = 'application/json';
    }

    const requestBody = body && !isFormData ? JSON.stringify(body) : body;

    const cacheOptions =
        typeof revalidate === 'number'
            ? { next: { revalidate } }
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
    options?: { revalidate?: number | false }
): Promise<T> => {
    const res = await baseFetchPublic<T>(url, {
        method: 'GET',
        revalidate: options?.revalidate,
    });
    if (res) {
        return res;
    } else {
        throw new Error(`مشکل در دریافت اطلاعات`);
    }
};

const postFetch = async <T>(url: string, body: any): Promise<T> => {
    return baseFetchPublic<T>(url, {
        method: 'POST',
        body
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
