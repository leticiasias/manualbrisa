<template>
  <v-app>
    <v-sheet color="#0D47A1" theme="dark" class="py-12 px-4 text-center" border-radius="0">
      <v-container>
        <div class="text-overline mb-2" style="letter-spacing: 2px !important;">Sempre organizado. Sempre transparente.</div>
        <h1 class="text-h3 font-weight-bold mb-4">Seu reembolso, mais rápido</h1>
        <p class="text-h6 font-weight-light mx-auto" style="max-width: 700px;">
          Saiba mais sobre o Sistema de Reembolso <strong>BRISA</strong>. 
          Nosso aplicativo permite registrar comprovantes de forma prática, automatizar cálculos e garantir que todo o fluxo seja rápido.
        </p>
      </v-container>
    </v-sheet>

    <v-main class="bg-grey-lighten-4">
      <v-container class="py-10" max-width="900">
        
        <v-row class="mb-12">
          <v-col cols="12" md="6">
            <v-card variant="text" class="pa-4">
              <h2 class="text-h5 font-weight-bold mb-4" style="color: #0D47A1">
                <v-icon class="mr-2">mdi-sync</v-icon>Como funciona o sistema
              </h2>
              <p class="text-body-1 text-grey-darken-3">
                Nosso aplicativo integra funcionários, gestores e financeiro em um único fluxo de prestação de contas. 
                De forma simples e intuitiva, você registra suas despesas, envia comprovantes e acompanha todo o processo.
              </p>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card variant="text" class="pa-4">
              <h2 class="text-h5 font-weight-bold mb-4" style="color: #0D47A1">
                <v-icon class="mr-2">mdi-target</v-icon>Por que usar o Sistema Brisa?
              </h2>
              <p class="text-body-1 text-grey-darken-3">
                Criamos o sistema para resolver problemas reais: perda de notas fiscais, inconsistências e atrasos. 
                Nossa solução <strong style="color: #0D47A1">automatiza etapas críticas e reduz erros</strong>.
              </p>
            </v-card>
          </v-col>
        </v-row>

        <div class="text-center mb-8">
          <h2 class="text-h4 font-weight-bold mb-2">Manuais por Perfil</h2>
          <p class="text-grey-darken-1">Escolha como você acessa o sistema para ver as instruções:</p>
        </div>

        <v-row>
          <v-col 
            v-for="perfil in perfisPrincipais" 
            :key="perfil.title" 
            cols="6"
          >
            <v-card elevation="2" rounded="lg" @click="navegarPara(perfil.route)" hover class="fill-height">
              <v-list-item class="pa-4">
                <template v-slot:prepend>
                  <v-avatar :color="perfil.color + '1A'" size="48" class="mr-2">
                    <v-icon :color="perfil.color" size="24">{{ perfil.icon }}</v-icon>
                  </v-avatar>
                </template>
                <v-list-item-title class="text-subtitle-1 font-weight-bold">{{ perfil.title }}</v-list-item-title>
                <v-list-item-subtitle class="text-caption">{{ perfil.subtitle }}</v-list-item-subtitle>
              </v-list-item>
            </v-card>
          </v-col>

          <v-col cols="12">
            <v-card elevation="3" rounded="lg" @click="navegarPara(perfilMobile.route)" hover color="blue-lighten-5">
              <v-list-item class="pa-5">
                <template v-slot:prepend>
                  <v-avatar :color="perfilMobile.color + '1A'" size="64" class="mr-4">
                    <v-icon :color="perfilMobile.color" size="32">{{ perfilMobile.icon }}</v-icon>
                  </v-avatar>
                </template>
                <v-list-item-title class="text-h6 font-weight-bold">{{ perfilMobile.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ perfilMobile.subtitle }}</v-list-item-subtitle>
                <template v-slot:append>
                  <v-btn icon="mdi-arrow-right" variant="text" color="#0D47A1"></v-btn>
                </template>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>

        <v-divider class="my-12"></v-divider>

        <div class="text-center mb-8">
          <h2 class="text-h5 font-weight-bold mb-2" style="color: #0D47A1">Principais Funções do Sistema</h2>
        </div>

        <v-row>
          <v-col v-for="(funcao, i) in funcoes" :key="i" cols="12" md="4">
            <v-card variant="outlined" color="grey-lighten-2" class="pa-4 fill-height text-center bg-white">
              <v-avatar color="#0D47A1" size="52" class="mb-4">
                <v-icon color="white">{{ funcao.icon }}</v-icon>
              </v-avatar>
              <h3 class="text-subtitle-1 font-weight-bold mb-2" style="color: #0D47A1">{{ funcao.titulo }}</h3>
              <p class="text-body-2 text-grey-darken-2">{{ funcao.descricao }}</p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const perfisPrincipais = ref([
  { title: 'Administrador', subtitle: 'Gestão de usuários.', icon: 'mdi-shield-account', color: '#0D47A1', route: '/admin' },
  { title: 'Gerente', subtitle: 'Aprovação de despesas.', icon: 'mdi-account-tie', color: '#0D47A1', route: '/gerente' },
  { title: 'Funcionário', subtitle: 'Lançamento de notas.', icon: 'mdi-account', color: '#0D47A1', route: '/funcionario' },
  { title: 'Financeiro', subtitle: 'Pagamentos.', icon: 'mdi-currency-usd', color: '#0D47A1', route: '/financeiro' }
]);

const perfilMobile = ref({ 
  title: 'Versão Mobile', 
  subtitle: 'Aprenda a usar o Brisa no seu celular de forma rápida e prática.', 
  icon: 'mdi-cellphone-information', 
  color: '#0D47A1', 
  route: '/mobile' 
});

const funcoes = ref([
  { titulo: 'Registro de Despesas', icon: 'mdi-receipt', descricao: 'Lançamento prático via OCR/QR Code ou manual.' },
  { titulo: 'Gestão de Viagens', icon: 'mdi-briefcase-check', descricao: 'Acompanhe tarefas e eventos atribuídos.' },
  { titulo: 'Fluxo de Aprovação', icon: 'mdi-sync', descricao: 'Monitoramento em tempo real do status.' }
]);

const navegarPara = (rota) => { router.push(rota); };
</script>