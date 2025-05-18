<script lang="ts" setup></script>

<template>
  <v-menu transition="slide-x-reverse-transition" :offset="10" scroll-strategy="close">
    <template #activator="{ props }">
      <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props"></v-btn>
    </template>

    <v-list>
      <v-list-item>
        <v-list-item-title>
          <LazyAuthLogoutButton
            :elevation="1"
            variant="plain"
            append-icon="mdi-logout"
            class="mx-1 text-sm"
          />
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

s
