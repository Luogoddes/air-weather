<template>
  <div class="weather-alert-container">
    <div v-if="warnings.length > 1" class="carousel">
      <div class="carousel-inner" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
        <div v-for="warning in warnings" :key="warning.id" class="carousel-item">
          <div class="alert-card">
            <h3>{{ warning.title }}</h3>
            <p style="margin-top: 7px;">
              <strong>开始时间:</strong> {{ formatDateTime(warning.startTime) }}
            </p>
            <p><strong>结束时间:</strong> {{ formatDateTime(warning.endTime) }}</p>
            <p>状态:<strong style="color: greenyellow;"> {{ warning.status }}</strong></p>
            <p>
              <strong>严重等级:</strong>
              <span :class="getSeverityClass(warning.title)">
                {{ getSeverityLevel(warning.title) }}
              </span>
            </p>
            <p>类型:<strong style="color: greenyellow;">{{ warning.typeName }}</strong> </p>
            <p v-if="warning.urgency"><strong>紧迫性:</strong> {{ warning.urgency }}</p>
            <p><strong>详情:</strong> {{ warning.text }}</p>
          </div>
        </div>
      </div>
      <button @click="prev" class="carousel-control prev">&lt;</button>
      <button @click="next" class="carousel-control next">&gt;</button>
    </div>
    <div v-else-if="warnings.length === 1" class="alert-card">
      <h3>{{ warnings[0].title }}</h3>
      <p><strong>开始时间:</strong> {{ formatDateTime(warnings[0].startTime) }}</p>
      <p><strong>结束时间:</strong> {{ formatDateTime(warnings[0].endTime) }}</p>
      <p>状态:<strong style="color: greenyellow;">{{ warnings[0].status }}</strong> </p>
      <p>
        <strong>严重等级:</strong>
        <span :class="getSeverityClass(warnings[0].title)">
          {{ getSeverityLevel(warnings[0].title) }}
        </span>
      </p>
      <p>类型:<strong style="color: greenyellow;">{{ warnings[0].typeName }}</strong> </p>
      <p v-if="warnings[0].urgency"><strong>紧迫性:</strong> {{ warnings[0].urgency }}</p>
      <p><strong>详情:</strong> {{ warnings[0].text }}</p>
    </div>
    <div v-else class="alert-card no-warning">
      <p>暂无预警</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WeatherAlert',
  props: {
    warnings: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    prev() {
      this.currentIndex = (this.currentIndex - 1 + this.warnings.length) % this.warnings.length;
    },
    next() {
      this.currentIndex = (this.currentIndex + 1) % this.warnings.length;
    },
    formatDateTime(dateTime) {
      return dateTime.slice(0, 16);
    },
    getSeverityLevel(title) {
      let levelColor='蓝色预警';
      if (title.includes('黄色预警')) levelColor='黄色预警';
      if (title.includes('橙色预警')) levelColor='橙色预警';
      if (title.includes('红色预警')) levelColor='红色预警';
      const match = title.match(/(\[(\S+)级)/);
      const level = match[2];
      return match ? `${level}级 ${levelColor}` : '';
    },
    getSeverityClass(title) {
      if (title.includes('蓝色预警')) return 'blue';
      if (title.includes('黄色预警')) return 'yellow';
      if (title.includes('橙色预警')) return 'orange';
      if (title.includes('红色预警')) return 'red';
      return '';
    }
  }
};
</script>

<style scoped>
.weather-alert-container {
  width: 270px;
  height: 350px;
  position: relative;
  overflow: hidden;
  border-radius: 5px;
}

.carousel {
  position: relative;
  width: 100%;
  height: 100%;
}

.carousel-inner {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.carousel-item {
  min-width: 100%;
  box-sizing: border-box;
}

.alert-card {
  padding: 10px;
  background-color: #00000000;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.alert-card.no-warning {
  background-color: #e0ffe000;
  display: flex;
  justify-content: center;
  align-items: center;
  color: green;
  font-size: 20px; /* 调整字体大小为所需大小 */
}

.carousel-control {
  position: absolute;
  top: 95%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.margintop3 {
  margin-top: 3px;
}

p {
  margin-top: 3px;
}

.carousel-control.prev {
  left: 10px;
}

.carousel-control.next {
  right: 10px;
}

.blue {
  color: blue;
}

.yellow {
  color: yellow;
}

.orange {
  color: orange;
}

.red {
  color: red;
}
</style>
