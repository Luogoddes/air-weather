<template>
    <el-cascader size="large" :options="pcaTextArr" v-model="selectedOptions" style="width: 300px;">
    </el-cascader>

</template>

<script>
import { pcaTextArr } from "element-china-area-data";//三级联动（省、市、区）
export default {
    data() {
        return {
            pcaTextArr,
            selectedOptions: [],//三级联动（省、市、区）
        };
    }
};
</script>