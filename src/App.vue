<template>
  <v-app>
    <v-toolbar dark app color = 'primary'>
      <v-toolbar-title class="headline text-uppercase" >

        <span class="font-weight-light" text-color="secondary">GT Utilities Audit</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

    </v-toolbar>

    <v-content>

      <!-- <v-layout row wrap>
  <v-flex md12 lg6>
    <v-date-picker v-model="picker" type="month" color="green lighten-1"></v-date-picker>
  </v-flex>
  <v-flex md12 lg6 class="hidden-xs-only">
    <v-date-picker v-model="picker2" type="month" color="green lighten-1" header-color="primary"></v-date-picker>
  </v-flex>
</v-layout> -->


</v-flex>
      <v-container grid-list-xs,sm,md,lg,xl>

<v-layout row wrap>


      </v-flex xs3>
        <v-menu
      v-model="menu2"
      :close-on-content-click="false"
      :nudge-right="40"
      lazy
      transition="scale-transition"
      offset-y
      full-width
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="date1"
          label="Pick Start Date"
          prepend-icon="event"
          readonly
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker v-model="date1"  type="month" @input="menu2 = false"></v-date-picker>
    </v-menu>


    <v-menu
    v-model="menu3"
    :close-on-content-click="false"
    :nudge-right="40"
    lazy
    transition="scale-transition"
    offset-y
    full-width
    min-width="290px"
    >
    <template v-slot:activator="{ on }">
    <v-text-field
      v-model="date2"
      label="Pick End Date"
      prepend-icon="event"
      readonly
      v-on="on"
    ></v-text-field>
    </template>
    <v-date-picker v-model="date2"  type="month" @input="menu3 = false"></v-date-picker>
    </v-menu>

    </v-flex>
    </v-layout>

        <v-btn color="primary" @click="updateTable">Condensate</v-btn>

        <v-btn round color="primary" small @click ="drawer = true">Show Graph</v-btn>
          <div>
          <table border="1">
              <thead>
                  <tr>
                    <th>Date</th>
                    <th v-for="day in days" width="50">{{ day }}</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="(item, item_index) in itemList" :key="item.name">
                    <td>{{ item.name }}</td>
                    <td v-for="(val,val_index) in item.vals"  @click="updateGraph(item_index, val_index)">{{val}}</td>
                    <!-- <td v-for="(day, day_index) in days" @click="alert(item_index, day_index)">{{day}}</td> -->
                  </tr>
              </tbody>
          </table>

        </div>
        <v-select
          :items="items"
          item-text="state"
          item-value="abbr"
          v-model="select"
          label="Select bulding"
          v-on:input="changeBuilding(`${select.abbr}`)"
          return-object
        ></v-select>

        <v-select
          :items="qnameList"
          item-text="state"
          item-value="abbr"
          v-model="select2"
          label="Select Quantity"
          v-on:input="changeQuant(`${select2.abbr}`)"
          return-object
        ></v-select>

        <v-navigation-drawer
          v-model="drawer"
          absolute
          temporary
          right
          width = "800"
        >

        <v-btn small round :color="clr2017" @click="change2017">2017</v-btn>
        <v-btn small round :color="clr2016" @click="change2016">2016</v-btn>
        <v-btn small round :color="clr2015" @click="change2015">2015</v-btn>


<v-flex xs6>



        <v-btn round :loading="loading1" :disabled="loading1" color="primary" dark @click = "showGraphFun">Show Year to date</v-btn>

        <v-btn round :loading="loading2" :disabled="loading2" color="primary" @click = "showgraphYearly">Show yearly Average</v-btn>
        <v-btn small round :color="cumulativeColor" @click = "cumulative">Cumulative</v-btn>
<!-- <span :show="false">

        <v-btn round small  :loading="loading3" :disabled="loading3" color="primary" @click = "showavg">Show Moving Average</v-btn>
</span> -->
</v-flex>


          <v-card ma-1>
            <span style="margin:10px">
          <div ref = 'echartsCard' style = 'height:500px; margin:10px'></div>
          </span>
        </v-card>
    </v-navigation-drawer>
      </v-container>

    </v-content>

  </v-app>
</template>

<script src = ".\script.js">
</script>
