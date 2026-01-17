<script setup lang="ts">
import { useRoute } from "vue-router"
import ApplicationForm from "@/components/ApplicationForm.vue"

const route = useRoute()
</script>

<template>
  <ApplicationForm mode="edit" :application-id="route.params.id" />
</template>
