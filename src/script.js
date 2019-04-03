import HelloWorld from './components/HelloWorld'
import echarts from 'echarts'

// function getDateArray(start, end) {
//     let arr = new Array();
//     let dt = new Date(start);
//     while (dt <= end) {
//         arr.push(new Date(dt));
//         print(dt.getFullYear())
//         dt.setDate(dt.getDate() + 1);
//     }
//     return arr;
// }

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data () {
    return {
      items: [{ state: 'Skiles', abbr: 'B002M' },
            { state: 'B084M', abbr:'B084M' }],
      svalue: ['B002M','B005M'],
      building: '',
      qname: '',
      qnameList: ['Condensate'],
      showGraph: false,
      labels: ['0','1','2','3'],
      value: [1,2,3,4],
      graphdata: [ { "sName": "B002M", "sID": "1238", "qName": "Condensate", "qID": "497", "data": [ { "time": "2019-01-25 14:15", "value": 6286035 } ] }],
      date: new Date().toISOString().substr(0, 10),
      endDate: new Date().toISOString().substr(0, 10),
      dateArray: [],
      menu: false,
      menu2: false,
      dateArrayString:'',
      years: [false,false,false],
      clr2017: "primary",
      dateStr2017: '',
      dateArr2017: [],
      clr2016: "primary",
      dateStr2016: '',
      dateArr2016: [],
      clr2015: "primary",
      dateStr2015: '',
      dateArr2015: [],
      averagedValues: [],
      loading1: false,
      loading2: false,
      graphseries: [],
      timeseries:[],
      avgbtn: false,
      cumulativeCheck: false,
      cumulativeColor: "primary",
      num: 98,
      days: ['Jan 1','Feb 1','March 1','April 1','May 1'],
      graphDays: [],
    itemList: [
    	{
      	name: 'Apple',
        vals: [1,2,3,4,5]
      },
      {
      	name: 'Banana',
        vals: [1,2,3,4,5]
      },
      {
      	name: 'Carrot',
        vals: [3,2,7,4,8]
      }
    ],
    dateStrAll: '',
    date1: new Date().toISOString().substr(0, 10),
    date2: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,
    menu3: false,
    drawer: null


      //
    }
  },
  methods:{
    updateGraph: function(item_index, day_index) {
        this.drawer = true
        let item = this.itemList[item_index];
        let day = this.days[day_index];
        console.log(item.vals);
        console.log(item.name);
        console.log(day);
        if(day == 'All'){
          console.log('All dates selected');

          let arr = []
          let startDate = new Date("2017-01-02")
          let endDate = new Date("2018-01-01")
          while (startDate <= endDate) {
              arr.push(String(startDate.getFullYear())+'-'+String(startDate.getMonth()+1)+'-'+String(startDate.getDate()))
              let blah = startDate.getDate() + 1
              startDate.setDate(blah);
          }
          // this.dateArr2017 = arr
          this.dateStrAll = arr.join('||')
          this.$http.get('http://energywatch.fac.gatech.edu:3000/api/rollcall?bldg='+item.name+'&num=1'+'&time='+this.dateStrAll).then(res => {
            console.log(res);
            let dat = res.data
            let timeArr = []
            let valArr = []
            for(let i = 0; i<_.size(dat); i++){
              if(dat[i].qName == 'Condensate'){
                timeArr.push(dat[i].data[0].time)
                valArr.push(dat[i].data[0].value)
              }
            }
            this.graphDays = timeArr
            const option = {
                legend: {type:'scroll',x:'right'},
                tooltip: {
                  trigger : 'axis',
                  axisPointer: {
                    type: 'cross'
                  }
                },
                grid : {
                  left :50,
                  top: 10,
                  right: 30,
                  bottom: 20,
                },
                xAxis: {
                  type: 'category',
                  // data: ['1','2','5']
                  data: this.graphDays
                },
                yAxis: {
                  type: 'value',
                  max:'dataMax',
                  min: 'dataMin'
                },
                series: {type:'line',data:valArr},
                title: {text:item.name +' '+ this.qname,x: 'center',}

              }
              this.chart.setOption(option, true)

          })

        }
        else{
        let dt = new Date(day)
        console.log(dt)
        console.log(dt.getDate());
        console.log(dt.getMonth());
        console.log(dt.getFullYear());
        let arr = []
        let startDate = new Date("2017-01-02")
        let endDate = new Date("2018-01-01")
        let datestr = ''
        let count = 0
        let timestr = String(dt.getFullYear())+'-'+String(dt.getMonth()+2)+'-'+String(dt.getDate())
        // this.dateArr2017 = arr
      datestr = arr.join('||')
        // console.log(datestr);
        // console.log('DATESTR');
        this.$http.get('http://energywatch.fac.gatech.edu:3000/api/rollcall?bldg='+item.name+'&num=3000'+'&time='+timestr).then(res => {
          let d = res.data
          let times = []
          let vals = []
          for(let i =0; i< d.length;i++){
            if(d[i].qName == 'Condensate'){
              for(let j = 0;j<_.size(d[i].data);j++){
                times.push(d[i].data[j].time)
                vals.push(d[i].data[j].value)
              }
            }
          }
          this.graphDays = _.reverse(times)
          console.log(vals);
          console.log(times);
          // for(let i = 0; i<this.itemList.length; i++){
          //   if(this.itemList[i].name == item.name){
          //     this.itemList[i].vals = vals
          //   }
          // }
        const option = {
            legend: {type:'scroll',x:'right'},
            tooltip: {
              trigger : 'axis',
              axisPointer: {
                type: 'cross'
              }
            },
            grid : {
              left :50,
              top: 10,
              right: 30,
              bottom: 20,
            },
            xAxis: {
              type: 'category',
              // data: ['1','2','5']
              data: this.graphDays
            },
            yAxis: {
              type: 'value',
              max:'dataMax',
              min: 'dataMin'
            },
            series: {type:'line',data:_.reverse(vals)},
            title: {text:item.name +' '+ this.qname,x: 'center',}

          }
          this.chart.setOption(option, true)
        })
      }
          // alert(item.name + ', Day ' + day);
      },
    updateTable: function(){
      console.log(this.date1);
      console.log(this.date2);
      let arr = []
      let sd = String(this.date1)+'-01'
      let ed = String(this.date2)+'-01'
      console.log(sd);
      let startDate = new Date(sd)
      let endDate = new Date(ed)
      let stardDate = this.date1
      let enddate = this.date2
      while (startDate <= endDate) {
          if(startDate.getDate() == 1){
            arr.push(String(startDate.getFullYear())+'-'+String(startDate.getMonth()+1)+'-'+String(startDate.getDate()))
          }
          let blah = startDate.getDate() + 1
          startDate.setDate(blah);
      }
      let timearr = arr.join('||')
      this.days = arr
      this.days.push('All')
      console.log(timearr);
      this.$http.get('http://energywatch.fac.gatech.edu:3000/api/rollcall?num=1&time='+timearr).then(res => {
          console.log(res.data)
          let d = res.data
          let lst = []

          for(let i =0; i< d.length;i++){
            if(d[i].qName =='Condensate'){
              lst.push(d[i])
            }

          }
          console.log(lst);
          let bldglst = []
          for(let i =0;i<lst.length;i++){
            bldglst.push(lst[i].sName)
            }
          let fnlst = []
          let bldglst2 = _.uniq(bldglst)
          for(let i = 0; i<bldglst2.length; i++){
            // console.log(bldglst2[i]);
          }
          console.log(bldglst2);
          for(let i =0; i<_.size(bldglst2); i++){
            let val = []
            for(let j =0; j<lst.length;j++){

              if(lst[j].sName == bldglst2[i] && _.size(lst[j]) == 5){
                // console.log(lst[j].sName);
                // console.log(bldglst2[i]);
                val.push(lst[j].data[0].value)
              }
            }
            val.push('All')
            fnlst.push({
              name:bldglst2[i],
              vals:val
            })
            val = []
          }
          // console.log(bldglst);
          // console.log(fnlst);
          this.itemList = fnlst
        })
    },
    cumulative: function(){
      this.timeseries = []
      this.timeseries = []
      if(this.cumulativeColor == "primary"){
      this.cumulativeColor = "secondary"
      this.cumulativeCheck = true
      num = 1
    }else{
      this.num = 98
      this.cumulativeCheck = false
    }
    },
    change2017: function(){
      this.timeseries = []
      this.graphseries = []
      if(this.clr2017 == "primary"){
        this.clr2017 = "secondary"
        this.years[2] = true
        // Setting up date array
        let arr = []
        let startDate = new Date("2017-01-02")
        let endDate = new Date("2018-01-01")
        while (startDate <= endDate) {
            arr.push(String(startDate.getFullYear())+'-'+String(startDate.getMonth()+1)+'-'+String(startDate.getDate()))
            let blah = startDate.getDate() + 1
            startDate.setDate(blah);
        }
        // this.dateArr2017 = arr
        this.dateStr2017 = arr.join('||')


      }else{
        this.clr2017 = "primary"
        this.dateStr2017 = ''
        this.years[2] = false

      }
    },
    change2016: function(){
      this.timeseries = []
      this.graphseries = []
      if(this.clr2016 == "primary"){
        this.clr2016 = "secondary"
        // Setting up date array
        this.years[1] = true
        let arr = []
        let startDate = new Date("2016-01-02")
        let endDate = new Date("2017-01-01")
        while (startDate <= endDate) {
            arr.push(String(startDate.getFullYear())+'-'+String(startDate.getMonth()+1)+'-'+String(startDate.getDate()))
            let blah = startDate.getDate() + 1
            startDate.setDate(blah);
        }
        // this.dateArr2017 = arr
        this.dateStr2016 = arr.join('||')
        // console.log(this.dateStr2017);

      }else{
        this.clr2016 = "primary"
        this.dateStr2016 = ''
        this.years[1] = false
        // console.log(dateStr2017);
      }
    },
    change2015: function(){
      this.timeseries = []
      this.graphseries = []
      if(this.clr2015 == "primary"){
        this.clr2015 = "secondary"
        // Setting up date array
        this.years[0] = true
        let arr = []
        let startDate = new Date("2015-01-02")
        let endDate = new Date("2016-01-01")
        while (startDate <= endDate) {
            arr.push(String(startDate.getFullYear())+'-'+String(startDate.getMonth()+1)+'-'+String(startDate.getDate()))
            let blah = startDate.getDate() + 1
            startDate.setDate(blah);
        }
        // this.dateArr2017 = arr
        this.dateStr2015 = arr.join('||')

      }else{
        this.clr2015 = "primary"
        this.dateStr2015 = ''
        this.years[0] = false
        // console.log(dateStr2017);
      }
    },
    showDate: function(){
      // Function generates list of days between specified dates. modifies variable of datearraystring
      let arr = [];
      let enddt = new Date("2019-01-02")
      let dt = new Date("2019-02-25")
      while (dt <= enddt) {
          arr.push(String(dt.getFullYear())+'-'+String(dt.getMonth()+1)+'-'+String(dt.getDate()))
          let blah = dt.getDate() + 1
          dt.setDate(blah);
      }
      this.dateArray = arr
      this.dateArrayString = this.dateArray.join('||')
      console.log(this.dateArrayString);
    },
    changeQuant: function(s){
      this.qname = s
      console.log(this.qname);
      this.timeseries = []
      this.graphseries = []
    },
    changeBuilding: function(s){
      this.timeseries = []
      this.graphseries = []
      console.log(s);
      this.$http.get(`http://energywatch.fac.gatech.edu:3000/api/rollcall?num=1&bldg=`+s).then(res => {
          console.log(res.data);
          let TempList =[]
          for(let i =0; i<res.data.length;i++){
            console.log(res.data[i].qName);
            TempList.push({state:res.data[i].qName, abbr:res.data[i].qName})
          }
          this.qnameList = TempList
          this.building = s
      })
    },
    showGraphFun(){

      let arr = []
      let startDate = new Date("2019-01-02")
      let endDate = new Date()
      while (startDate <= endDate) {
          arr.push(String(startDate.getFullYear())+'-'+String(startDate.getMonth()+1)+'-'+String(startDate.getDate()))
          let blah = startDate.getDate() + 1
          startDate.setDate(blah);
      }
      // this.dateArr2017 = arr
      this.dateArrayString = arr.join('||')
      console.log(this.dateArrayString);


        this.showGraph = true
        this.$http.get('http://energywatch.fac.gatech.edu:3000/api/rollcall?num=1&bldg=' + String(this.building)+'&time='+String(this.dateArrayString)).then(res => {
          console.log(res.data);
          this.graphdata = [...res.data]
          // let stuff = this.graphdata[0].data
          let t = []
          let d = []
          for(let i = 0; i<this.graphdata.length; i++){
            if(this.graphdata[i].sName == this.building && this.graphdata[i].qName == this.qname){
              t.push(this.graphdata[i].data[0].time.slice(5,10))
              d.push(this.graphdata[i].data[0].value)
            }
          }
          // console.log(t);
          // console.log(d);
          if(this.cumulativeCheck == true){
            let frstVal = d[0]
            for(let i = 0; i <d.length; i++){
              d[i] = d[i]-frstVal
            }
          }
          this.graphseries.push({type:'line',data:d,name:'Year to date'})
          console.log(this.graphseries[0].name)
          if(this.timeseries.length == 0){
            this.timeseries = t

          }else{
            console.log('No change in series');
          }
          const option = {
              legend: {type:'scroll',x:'right'},
              tooltip: {
                trigger : 'axis',
                axisPointer: {
                  type: 'cross'
                }
              },
              grid : {
                left :50,
                top: 10,
                right: 30,
                bottom: 20,
              },
              xAxis: {
                type: 'category',
                // data: ['1','2','5']
                data: this.timeseries
              },
              yAxis: {
                type: 'value',
              },
              series: this.graphseries,
              title: {text:this.building +' '+ this.qname,x: 'center',}

            }
            this.chart.setOption(option, true)

        })

    },
    showgraphYearly: function(){
      this.loading2 = true
      let times = ''
      let dtLstArr = [this.dateStr2015,this.dateStr2016,this.dateStr2017];

      for(let i = 0; i<this.years.length;i++){
        if(this.years[i] == true){
          times += String(dtLstArr[i])+'||'
        }
      }
      // console.log('Times after adding');
      // console.log(times);
      // alert(this.dateStr2017)
      console.log(this.qname);
      // console.log('http://energywatch.fac.gatech.edu:3000/api/rollcall?num='+String(this.num)+'&bldg=' + String(this.building)+'&time='+String(times));
      this.$http.get('http://energywatch.fac.gatech.edu:3000/api/rollcall?num='+String(this.num)+'&bldg=' + String(this.building)+'&time='+String(times)).then(res => {
        console.log(res);
        let valArr = []
        let dArr = []
        for(let i =0,  len = res.data.length; i< len; i++){
          // console.log(res.data[i].length);
          // console.log(Object.keys(res.data[i]).length)
          if(res.data[i].qName == this.qname && Object.keys(res.data[i]).length == 5){
            let get_avg = 0
            for(let j = 0, len = _.size(res.data[i].data);j<len;j++){
              get_avg += res.data[i].data[j].value
            }
            get_avg = get_avg/_.size(res.data[i].data)
            // valArr.push(res.data[i].data[0].value)
            valArr.push(get_avg)
            dArr.push(res.data[i].data[0].time)
          }
        }

        for(let i = 0, len = dArr.length; i< len; i++){
          dArr[i] = dArr[i].slice(5,10)
        }
        // console.log(dArr)
        let objArr = []
        for(let i = 0, len = valArr.length; i<len; i++){
          objArr.push({ date:dArr[i], value:valArr[i]})
        }
        let totArr = []
        let datesfound = []
        for(let i = 0, len = objArr.length; i<len; i++){
          if(datesfound.includes(objArr[i].date)){
            for(let j =0; j<totArr.length;j++){
              if(totArr[j].date == objArr[i].date && objArr[i] != null){
                totArr[j].val.push(objArr[i].value)
              }
            }
          }else{
            datesfound.push(objArr[i].date)
            totArr.push({date:objArr[i].date, val:[objArr[i].value]})
          }
        }
        console.log('Obj Array');
        console.log(objArr);
        let valArrfin = []
        let dArrfin = []
        totArr = _.sortBy(totArr,'date')
        console.log('Total Array');
        console.log(totArr);
        for(let i = 0, len = totArr.length; i<len; i++){
          // lenWONull = _.compact(totArr[i].val)
          console.log(_.size(totArr[i].val));
          totArr[i].val = _.sum(totArr[i].val)/(_.size(totArr[i].val))

          valArrfin.push(totArr[i].val)
          dArrfin.push(totArr[i].date)
        }
        let movingAvgArr = []
        movingAvgArr.push(valArrfin[0])
        movingAvgArr.push(valArrfin[0]/2+valArrfin[1]/2)
        movingAvgArr.push(valArrfin[0]/3+valArrfin[1]/3+valArrfin[2]/3)
        movingAvgArr.push(valArrfin[0]/4+valArrfin[1]/4+valArrfin[2]/4+valArrfin[3]/4)
        for(let i = 5, len = valArrfin.length-5; i<len;i++){
          let avgBfr = valArrfin[i-4]+valArrfin[i-3]+valArrfin[i-2]+valArrfin[i-1] +valArrfin[i]
          let avgAfr = valArrfin[i+1]+valArrfin[i+2]+valArrfin[i+3]+valArrfin[i+4]
          let avg = (avgBfr+avgAfr)/9
          movingAvgArr.push(avg)
        }
        movingAvgArr.push(valArrfin[-1]/6+valArrfin[-3]/6+valArrfin[-3]/6+valArrfin[-4]/6+valArrfin[-5]/6+valArrfin[-6]/6)
        movingAvgArr.push(valArrfin[-1]/5+valArrfin[-3]/5+valArrfin[-3]/5+valArrfin[-4]/5+valArrfin[-5]/5)
        movingAvgArr.push(valArrfin[-1]/4+valArrfin[-3]/4+valArrfin[-3]/4+valArrfin[-4]/4)
        movingAvgArr.push(valArrfin[-1]/3+valArrfin[-2]/3+valArrfin[-3]/3)
        movingAvgArr.push(valArrfin[-1]/2+valArrfin[-2]/2)
        movingAvgArr.push(valArrfin[-1])
        // movingAvgArr.push(valArrfin[-1]/2+valArrfin[-2]/2)
        // movingAvgArr.push(valArrfin[-1]/3+valArrfin[-2]/3+valArrfin[-3]/3)
        // movingAvgArr.push(valArrfin[-1]/4+valArrfin[-3]/4+valArrfin[-3]/4+valArrfin[-4]/4)

        console.log('Moving average');
        console.log(movingAvgArr);
        console.log(movingAvgArr.length);
        console.log(valArrfin.length);
        if(this.cumulativeCheck == true){
          let frstVal = valArrfin[0]
          for(let i =0; i<valArrfin.length; i++){
            valArrfin[i] = valArrfin[i]- frstVal
          }
        }
        this.loading2 = false
        // this.avgbtn = true
        if(this.cumulativeCheck == false){
          this.graphseries.push({type:'line', data:movingAvgArr, name:'Moving average'})
          }
        this.graphseries.push({type:'line',data:valArrfin,name:'Averaged Values'})
        console.log('graphseries');
        console.log(this.graphseries);
        this.timeseries = dArrfin
        const option = {
          legend: {type:'scroll',x:'right'},
            tooltip: {
              trigger : 'axis',
              axisPointer: {
                type: 'cross'
              }
            },
            grid : {
              left :50,
              top: 10,
              right: 30,
              bottom: 20,
            },
            xAxis: {
              type: 'category',
              // data: ['1','2','5']
              data: this.timeseries
            },
            yAxis: {
              type: 'value',
            },
            series: this.graphseries,
            title: {text:this.building +' '+ this.qname,x: 'center',}

          }
          this.chart.setOption(option, true)
        // this.graphData(valArrfin,dArrfin)
      })

    },
    graphData(ydata,xdata){
      const option = {
          tooltip: {
            trigger : 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          grid : {
            left :50,
            top: 10,
            right: 30,
            bottom: 20,
          },
          xAxis: {
            type: 'category',
            // data: ['1','2','5']
            data: this.timeseries
          },
          yAxis: {
            type: 'value',
          },
          series: this.graphseries,
          title: {text:this.building +' '+ this.qname,x: 'center',}

        }
        this.chart.setOption(option, true)
    },



  },
  mounted() {
  // setTimeOut(()=>{
  this.chart = echarts.init(this.$refs.echartsCard),
  window.addEventListener('resize', this.chart.resize)
// }, 1)
}
}
