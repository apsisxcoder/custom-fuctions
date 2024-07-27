# Custom Date Functions Plugin

This project provides a set of custom date functions that can be easily integrated into a Vue.js application. These functions help with various date manipulations and formatting tasks.

## Installation

To install the necessary dependencies, run:

```bash
npm install moment
npm i @apsisxcoder/custom-functions
```

## Usage

To use the custom date functions in your Vue.js application, you need to install the plugin:

```bash
import { createApp } from 'vue';
import CustomDateFunctions from '@apsisxcoder/custom-functions';

const app = createApp(App);
app.use(CustomDateFunctions);
app.mount('#app');
```

## Functions

### $FormatDate

Formats a given date string into a human-readable format.

### $GetUtcJsonDate

Takes a date string as input and returns it in UTC format starting from the start of the day.

### $GetUtcOnlyDate

Takes a date string as input and returns it in UTC format starting from the start of the day, but only the date part.

### $GetUtcDateAndTime

Takes a date string as input and returns it in a specific format including the time. The time is in UTC.

### $GetDateAndTime

Takes a date string as input and returns it in a specific format including the time.

### $GetDateFromNow

Takes a date string as input and returns a string representing how long ago that date is from the current date.

### $GetNextSaturdayByWeek

Takes a start date and a number of weeks as input. It calculates the date of the next Saturday after the given number of weeks from the start date.

### $DeepObjectCopy

Creates a deep copy of the given object.

### $SetGrouppedList

Processes a list of items, grouping them by headers and removing the headers from individual items.

## Example

Here is an example of how to use the `$FormatDate` function in a Vue component

```bash
<template>
  <div>{{ formattedDate }}</div>
</template>

<script>
export default {
  data() {
    return {
      date: '2023-10-05T14:48:00.000Z',
    };
  },
  computed: {
    formattedDate() {
      return this.$FormatDate(this.date);
    },
  },
};
</script>
```
