<template>
  <q-page class="flex flex-center">
    <div
      class="q-gutter-md"
      style="width:700px; padding: 10px;"
    >
      <q-input
        outlined
        v-model="rfid"
        label="Batch ID"
      />
      <q-input
        outlined
        v-model="drugname"
        label="Drug Name"
      />
     <q-input
        outlined
        v-model="amount"
        label="Amount"
      />
      <q-input
        outlined
        v-model="organization"
        label="Organization"
      />
	   <q-input
        outlined
        v-model="minTemp"
        label="Min Temperature"
      />
	   <q-input
        outlined
        v-model="maxTemp"
        label="Max Temperature"
      />
	    <q-input
        outlined
        v-model="temp"
        label=" Current Temperature"
      />

      <div class="row">
        <div class="col">
          <p>Manufactured Date:</p>
          <q-date
            v-model="manufacture_date"
            today-btn
          />
        </div>
        <div class="col">
          <p>Expire Date:</p>
          <q-date
            v-model="expiry_date"
            today-btn
          />
        </div>
      </div>
      <q-btn
        color="primary"
        icon="done_outline"
        label="Add Batch"
        v-on:click="addBatch"
      />
      <q-btn
        color="red"
        icon="mail"
        label="Clear"
        v-on:click="clear"
      />
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'AddBatch',
  methods: {
    clear: function () {
      this.rfid = ''
      this.drugname = ''
      this.amount = ''
      this.organization = ''
      this.manufacture_date = ''
      this.expiry_date = ''
	  this.minTemp = ''
	  this.maxTemp= ''
	  this.temp= ''
    },
    addBatch: function () {
      this.$axios.post(`/api/addbatch`, {
        rfid: this.rfid,
        drugname: this.drugname,
        amount: this.amount,
        organization: this.organization,
        manufacture_date: this.manufacture_date,
        expiry_date: this.expiry_date,
		minTemp: this.minTemp,
		maxTemp: this.maxTemp,
		temp: this.temp
      }).then((resp) => {
        console.log(resp)
        this.$q.notify({
          message: 'Batch added successfully',
          color: 'green'
        })
      }).catch(err => {
        console.log(err)
        this.$q.notify({
          message: 'Failed to add batch',
          color: 'red'
        })
      })
    }
  },
  data () {
    return {
      rfid: '',
      drugname: '',
      amount: '',
      organization: '',
      manufacture_date: '',
      expiry_date: '',
	  minTemp: '',
	  maxTemp: '',
	  temp: ''
    }
  }
}
</script>
