<template>
  <div>
    <ExtensionName />
    <button class="button mb-2" @click="fhyHeavyRainStartEvent">FHY大雨/豪雨開設</button>
    <button class="button mb-2" @click="fhyHeavyRainEventSMS">FHY大雨/豪雨開設/解除簡訊</button>
    <button class="button mb-2" @click="fhyHeavyRainFax">FHY大雨/豪雨開設傳真下載</button>
    <button class="button mb-2" @click="fhyCreateResponseTeam">FHY開設應變小組</button>
    <div class="text-center">如果按一下沒反應可以按兩下</div>
  </div>
</template>

<script>
import ExtensionName from '@/components/ExtensionName.vue'
import { FHY_HEAVY_RAIN_START_EVENT, FHY_HEAVY_RAIN_START_EVENT_SMS, FHY_START_RESPONSE_TEAM, FHY_HEAVY_RAIN_FAX } from '@/const/events'

export default {
  name: 'App',
  methods: {
    fhyHeavyRainStartEvent () {
      this.sendMessage(FHY_HEAVY_RAIN_START_EVENT)
    },
    fhyHeavyRainEventSMS () {
      this.sendMessage(FHY_HEAVY_RAIN_START_EVENT_SMS)
    },
    fhyHeavyRainFax () {
      this.sendMessage(FHY_HEAVY_RAIN_FAX)
    },
    fhyCreateResponseTeam () {
      this.sendMessage(FHY_START_RESPONSE_TEAM)
    },
    sendMessage (action) {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action })
      })
    }
  },
  components: { ExtensionName }
}
</script>

<style scoped>
.button {
  display: inline-block;
  font-size: .8rem;
  font-weight: 500;
  color: #fff;
  background: #1a5cff;
  padding: 10px 18px;
  box-sizing: border-box;
  border-radius: 15px;
  border: none;
  width: 100%;
  cursor: pointer;
  outline: none;
  white-space: nowrap;
}

.text-center {
  text-align: center;
}

.mb-2 {
  margin-bottom: 8px;
}
</style>
