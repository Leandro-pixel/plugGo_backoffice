      <template>
  <q-layout>
    <q-page-container class="page_padding custom_center flex bg-page window-height relative-position">

      <div class="flex column  justify-center items-center custom_z "> <!-- div do box para logar-->
          <span class="agro_text mt-lg">PlugGo</span>
        <q-card class="login__cards default-box-shadow big-border-radius  ">

          <q-card-actions class="login__card flex-grow justify-center">
            <q-form ref="myForm" @submit="submit" style="width: 60%">
              <q-input
              standard
                class="q-mb-md"
                v-model="email"
                label="E-mail"
                autocomplete="username"
                :rules="[(val:any) => Validator.isValidEmail(val) || 'Por favor, insira um e-mail válido']"
                lazy-rules
              />
              <q-input
              standard
                class="q-mb-md"
                v-model="password"
                label="Senha"
                :type="isPwd ? 'password' : 'text'"
                autocomplete="current-password"
                :rules="[(val:any) => Validator.isValidPassword2(val) || 'Por favor, insira uma senha válida']"
                lazy-rules
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                    color="primary"
                  />
                </template>
              </q-input>

              <div class="row q-mb-md justify-between">
                <q-checkbox v-model="rememberMe" label="Lembrar e-mail" color="primary" />
              </div>

              <PrimaryButton :loading="loading" label="Entrar" :btn-type="'submit'" rounded class="full-width" />
            </q-form>
          </q-card-actions>
        </q-card>
      </div>
      <!-- Lado esquerdo - Imagem
        <q-img
          src="images/login_background.jpg"
          fit="cover"
          class="corner-image  absolute-bottom-right"
        /> -->
    </q-page-container>
  </q-layout>
</template>


<script setup lang="ts">
import api from 'src/lib/api';
import {  ref } from 'vue';
import { NotifyError, ShowDialog } from 'src/utils/utils';
import { useRouter } from 'vue-router';
import PrimaryButton from 'src/components/button/PrimaryButton.vue';
import { UnauthorizedError } from 'src/lib/errors/unauthorizedError';
import { Validator } from 'src/utils/validator';

const email = ref('');
const password = ref('');
const isPwd = ref(true);
const loading = ref(false);
const rememberMe = ref(false);
const router = useRouter();
const invalidCredentials = ref(false);


const submit = async () => {
  //função do login
  loading.value = true;
  await api
    .login(email.value, password.value)
    .then(() => {
      rememberMe.value
        ? localStorage.setItem('email', btoa(email.value))
        : localStorage.removeItem('email');
        router.push('/dashboard');
    })
    .catch((error: any) => {
      console.log(error.message);
      if (error instanceof UnauthorizedError) {
        invalidCredentials.value = true;
        NotifyError.error(error.message);
      } else {
        //router.push('/dashboard/segmentos')// autorizando entrar para testes

        ShowDialog.show('Erro', error.message);
      }
    })
    .finally(() => {
      loading.value = false;
      setTimeout(() => {
        invalidCredentials.value = false;
      }, 6000);
    });
};
</script>
