export const createDynamicObject = <T extends Record<string, any>>(payload: T): T => {
  return new Proxy(payload, {
    get(target, prop: string | symbol) {
      // Verificar se prop é um símbolo e retornar um erro ou um valor adequado
      if (typeof prop === 'symbol') {
        //Tentando acessar um Symbol, o que não é permitido
        return undefined;  // Ou lançar um erro se necessário
      }

      //Acessando a propriedade: ${prop}

      // Verifica se o target é um Proxy Vue e acessa a versão original se necessário
      if (prop === '__v_raw' && target.__v_raw) {
        //Acessando o objeto original do Proxy Vue
        target = target.__v_raw;  // Acessa o valor original
      }

      // Acessa a propriedade normalmente
      if (prop in target) {
        //Propriedade encontrada diretamente: ${prop} = ${target[prop as keyof T]}
        return target[prop as keyof T];
      }

      // Busca uma chave similar (ignora maiúsculas/minúsculas)
      const keyFound = Object.keys(target).find(key => key.toLowerCase() === prop.toLowerCase());
      if (keyFound) {
        //Propriedade similar encontrada: ${keyFound} = ${target[keyFound as keyof T]}
        return target[keyFound as keyof T];
      }

      //Propriedade não encontrada: ${prop}
      return undefined;
    }
  });
};
