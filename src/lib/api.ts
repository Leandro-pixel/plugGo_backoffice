import axios from 'axios';
import { UnauthorizedError } from './errors/unauthorizedError';
import { InternalError } from './errors/internalError';
import { BadRequestError } from './errors/badRequestError';
import { NotFoundError } from './errors/notFoundError';
import { NotAcceptableError } from './errors/notAcceptableError';
const BASE_URL = process.env.BASE_API_URL;
const API_KEY = process.env.API_KEY;
const MAX_RETRIES = 3;

interface DataResponse {
  data?: any;
}

export interface SuccessResponse {
  success: boolean;
}

export interface PaginatedResponse {
  data: any[];
  totalItems: number;
}

const refreshToken = async (): Promise<SuccessResponse> => {
  for (let i = 0; i < 3; i++) {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      const response = await axios.post(`${BASE_URL}/refresh-token`, null, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });

      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);

      return { success: true };
    } catch (error) {}
  }
  return { success: false };
};

const requestPost = async function (
  path: string,
  body?: any | null,
  params?: any | null,
  headers?: any,
  retried = 0
): Promise<DataResponse['data']> {
  const token = localStorage.getItem('accessToken');
  console.log('path:' + path);
  console.log('body:' + JSON.stringify(body)); // Adicionando JSON.stringify para visualizar o conteúdo do body
  console.log('params:' + JSON.stringify(params)); // Para verificar os parâmetros no console
  console.log('token:' + token);

  try {
    const response = await axios.post(`${BASE_URL}${path}`, body, {
      headers,
      params,
    });
    console.log(response.status + response.data)
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      const result = await refreshToken();
      if (result.success && retried < MAX_RETRIES) {
        return requestPost(path, body, params, headers, retried + 1); // Passando todos os parâmetros corretamente
      } else {
        throw new UnauthorizedError();
      }
    } else if (error.response && error.response.status === 400) {
      throw new BadRequestError();
    } else if (error.response && error.response.status === 404) {
      throw new NotFoundError();
    } else if (error.response && error.response.status === 406) {
      throw new NotAcceptableError();
    }
    throw new InternalError();
  }
};

const requestPostWithParams = async function (
  path: string,
  params: any | null,
  headers?: any,
  retried = 0
): Promise<DataResponse['data']> {
  const token = localStorage.getItem('accessToken');
  console.log('path:' + path);
  console.log('params:' + params);
  console.log('token:' + token);

  headers = {
    ...headers,
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.post(`${BASE_URL}${path}`, null, {
      // Passa 'null' para o body
      headers,
      params, // Envia os dados em params em vez de body
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      const result = await refreshToken();
      if (result.success && retried < MAX_RETRIES) {
        return requestPost(path, params, headers, retried + 1);
      } else {
        throw new UnauthorizedError();
      }
    } else if (error.response && error.response.status === 400) {
      throw new BadRequestError();
    } else if (error.response && error.response.status === 404) {
      throw new NotFoundError();
    } else if (error.response && error.response.status === 406) {
      throw new NotAcceptableError();
    }
    throw new InternalError();
  }
};

const requestPostWithApiKey = async function (
  path: string,
  body: any | null,
  headers?: any,
  retried = 0
): Promise<void> {
  const token = localStorage.getItem('accessToken');

  headers = {
    ...headers,
    'api-key': API_KEY,
    Authorization: `Bearer ${token}`,
  };

  try {
    await axios.post(`${BASE_URL}${path}`, body, {
      headers,
    });
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      const result = await refreshToken();
      if (result.success && retried < MAX_RETRIES) {
        return requestPostWithApiKey(path, body, headers, retried + 1);
      } else {
        throw new UnauthorizedError();
      }
    } else if (error.response && error.response.status === 400) {
      throw new BadRequestError();
    } else if (error.response && error.response.status === 404) {
      throw new NotFoundError();
    } else if (error.response && error.response.status === 406) {
      throw new NotAcceptableError();
    }
    throw new InternalError();
  }
};

const requestGetWithBody = async function (
  path: string,
  params?: any,
  body?: any,
  headers?: any,
  retried = 0
): Promise<DataResponse['data']> {
  const token = localStorage.getItem('accessToken');
  headers = {
    ...headers,
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
  params = new URLSearchParams(params);
  console.log('Conteúdo do body:', JSON.stringify(body));

  try {
    const response = await axios.get(
      `${BASE_URL}${path}`,
      {

      headers,
      params,
    });

    console.log('aquii', response.data);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      const result = await refreshToken();
      if (result.success && retried < MAX_RETRIES) {
        return requestGetWithBody(path, params, body, headers, retried + 1);
      } else {
        throw new UnauthorizedError();
      }
    } else if (error.response && error.response.status === 400) {
      throw new BadRequestError();
    } else if (error.response && error.response.status === 404) {
      throw new NotFoundError();
    } else if (error.response && error.response.status === 406) {
      throw new NotAcceptableError();
    }
    console.log('veio para o request' + params());
    throw new InternalError();
  }
};

const requestGetCEP = async function (
  path: string,
  params?: any,

  headers?: any,
  retried = 0
): Promise<DataResponse['data']> {
  const token = localStorage.getItem('accessToken');
  headers = {
    ...headers,
    Authorization: `Bearer ${token}`,
  };
  params = new URLSearchParams(params);
  console.log('veio para o request' + params);
  try {
    const response = await axios.get(
      `${path}`,
      {
        headers,
        params
      }
    );
    console.log('aquii', response.data);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      const result = await refreshToken();
      if (result.success && retried < MAX_RETRIES) {
        return requestGet(path, params, headers, retried + 1);
      } else {
        throw new UnauthorizedError();
      }
    } else if (error.response && error.response.status === 400) {
      throw new BadRequestError();
    } else if (error.response && error.response.status === 404) {
      throw new NotFoundError();
    } else if (error.response && error.response.status === 406) {
      throw new NotAcceptableError();
    }
    console.log('veio para o request' + params());
    throw new InternalError();
  }
};

const requestGet = async function (
  path: string,
  params?: any,
  headers?: any,
  retried = 0
): Promise<DataResponse['data']> {
  const token = localStorage.getItem('accessToken');
  headers = {
    ...headers,
    Authorization: `Bearer ${token}`,
  };
  params = new URLSearchParams(params);
  console.log('veio para o request' + params);
  try {
    const response = await axios.get(
      //`${BASE_URL}${path}?${params.toString()}`,
      `${BASE_URL}${path}`,
      {
        headers,
        params
      }
    );
    console.log('aquii', response.data);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      const result = await refreshToken();
      if (result.success && retried < MAX_RETRIES) {
        return requestGet(path, params, headers, retried + 1);
      } else {
        throw new UnauthorizedError();
      }
    } else if (error.response && error.response.status === 400) {
      throw new BadRequestError();
    } else if (error.response && error.response.status === 404) {
      throw new NotFoundError();
    } else if (error.response && error.response.status === 406) {
      throw new NotAcceptableError();
    }
    console.log('veio para o request' + params());
    throw new InternalError();
  }
};

const requestGetWithApiKey = async function (
  path: string,
  params?: any,
  headers?: any,
  retried = 0
): Promise<DataResponse['data']> {
  const token = localStorage.getItem('accessToken');
  headers = {
    ...headers,
    'api-key': API_KEY,
    Authorization: `Bearer ${token}`,
  };
  params = new URLSearchParams(params);
  try {
    const response = await axios.get(
      `${BASE_URL}${path}?${params.toString()}`,
      {
        headers,
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      const result = await refreshToken();
      if (result.success && retried < MAX_RETRIES) {
        return requestGet(path, params, headers, retried + 1);
      } else {
        throw new UnauthorizedError();
      }
    } else if (error.response && error.response.status === 400) {
      throw new BadRequestError();
    } else if (error.response && error.response.status === 404) {
      throw new NotFoundError();
    } else if (error.response && error.response.status === 406) {
      throw new NotAcceptableError();
    }
    throw new InternalError();
  }
};

const requestDelete = async (
  path: string,
  params?: any,
  headers?: any,
  retried = 0
): Promise<void> => {
  const token = localStorage.getItem('accessToken');
  params = new URLSearchParams(params);
  headers = {
    ...headers,
    Authorization: `Bearer ${token}`,
  };
  try {
    await axios.delete(`${BASE_URL}${path}${params.toString()}`, {
      headers,
    });
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      const result = await refreshToken();
      if (result.success && retried < MAX_RETRIES) {
        return requestDelete(path, retried + 1);
      }
    } else if (error.response && error.response.status === 400) {
      throw new BadRequestError();
    } else if (error.response && error.response.status === 404) {
      throw new NotFoundError();
    } else if (error.response && error.response.status === 406) {
      throw new NotAcceptableError();
    }
    throw new InternalError();
  }
};

const requestPut = async function (
  path: string,
  body: any | null,
  params?: any,
  headers?: any,
  retried = 0
): Promise<DataResponse['data']> {
  params = new URLSearchParams(params);
  const token = localStorage.getItem('accessToken');
  headers = {
    ...headers,
    Authorization: `Bearer ${token}`,
  };
  const queryString = params.toString() ? `?${params.toString()}` : '';

  console.log(`path ${BASE_URL}${path}${queryString}`);

  try {

    const response = await axios.put(`${BASE_URL}${path}${queryString}`, body, {
      headers,
    });
    console.log('aquii', response.data);

    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      const result = await refreshToken();
      if (result.success && retried < MAX_RETRIES) {
        return requestPut(path, body, headers, retried + 1);
      } else {
        throw new UnauthorizedError();
      }
    } else if (error.response && error.response.status === 400) {
      throw new BadRequestError();
    } else if (error.response && error.response.status === 404) {
      throw new NotFoundError();
    } else if (error.response && error.response.status === 406) {
      throw new NotAcceptableError();
    }
    throw new InternalError();
  }
};

const login = async (email: string, password: string): Promise<void> => {
  console.log(BASE_URL);

  try {
    // Basic Auth -> base64(email:password)
    const token = btoa(`${email}:${password}`);

    const response = await axios.post(
      `${BASE_URL}/signin/employee`,
      {}, // body vazio (ou pode remover o payload)
      {
        headers: {
          Authorization: `Basic ${token}`,
        },
      }
    );

    console.log(response.data.uuid);

    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('userName', response.data.name);

  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      throw new UnauthorizedError('Seu e-mail ou senha estão incorretos.');
    } else {
      localStorage.setItem('userType', btoa('sysAdmin'));
      console.log('Valor definido: ' + localStorage.getItem('userType'));
      throw new InternalError();
    }
  }
};

const logout = () => {


  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('userType');
};

export default {
  requestGet,
  requestGetCEP,
  requestGetWithApiKey,
  requestGetWithBody,
  requestPost,
  requestPostWithParams,
  requestPostWithApiKey,
  requestDelete,
  requestPut,
  login,
  logout,
};
