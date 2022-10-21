<template>
<q-page class="flex flex-center">
  <div class="q-px-lg q-pb-md">
          <q-btn
            color="primary"
            icon="download"
            label="Track Report"
            v-on:click="generateReport"/>
          </div>
      <div
        class="q-gutter-md"
        style="width:700px; padding: 10px;">
      <div class="row">
        <div class="col">
          <q-input
            outlined
            v-model="batchID"
            label="BatchID"/>
        </div>
		&nbsp&nbsp&nbsp
        <div class="col-3">
          <q-btn
            color="primary"
            icon="search"
            label="Search"
            v-on:click="search"/>
        </div>
	</div>
      </div>
    <VueHtml2pdf
        :show-layout="false"
        :float-layout="true"
        :enable-download="true"
        :preview-modal="true"
        :paginate-elements-by-height="1400"
        filename="TraceReport"
        :pdf-quality="2"
        :manual-pagination="false"
        pdf-format="a4"
		   :pdf-margin="10"
        pdf-orientation="portrait"
        pdf-content-width="800px"
        ref="html2Pdf">
	 <section slot="pdf-content">
      <div class="q-px-lg q-pb-md">
        <q-timeline color="secondary" v-if="transactions !== null && transactions.length > 0">
		    <div class='text-h4'>
		      Transaction Ledger
		     </div>
          <div>
            <q-timeline-entry
              v-for="(transaction, i) in transactions"
              v-bind:key="transaction.TxId"
              :title="getTitle(i)">
			        <div v-if ="transaction.IsDelete === 'false' ">
			        <div >
                Organization : {{transaction.Value.organization}}
              </div>
              <div >
                TXID: {{transaction.TxId}}
              </div>
              <div>
                 Current Temperature: {{transaction.Value.temp}}°C
			  </div>
			  </div>
			  <div v-if="transactions !== null && transaction.Value.maxTemp<transaction.Value.temp">
        		<p id="myP" style="color:red;">Recall the Batch</p>
        	  </div>
            </q-timeline-entry>
          </div>
        </q-timeline>
      </div>
	  <div
        v-if="transactions !== null && transactions.length > 0"
        style="padding: 15px;">
        <div
          class="items-start q-gutter-md"
          style="padding: 5px;">
          <q-card class="my-card">
            <q-card-section>
              <div class="text-h6">
                Product Details
              </div>
            </q-card-section>
            <q-card-section>
              <q-list>
                <q-item
                  clickable
                  v-ripple>
                  <q-item-section>
                    <q-item-label overline>Drug Name</q-item-label>
                    <q-item-label>{{transactions[0].Value.drugName}}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-ripple>
                  <q-item-section>
                    <q-item-label overline>Price</q-item-label>
                    <q-item-label>{{transactions[0].Value.amount}}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-ripple>
                  <q-item-section>
                    <q-item-label overline>Manufactured Date</q-item-label>
                    <q-item-label>{{transactions[0].Value.dateManufactured}}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-ripple>
                  <q-item-section>
                    <q-item-label overline>Expiry Date</q-item-label>
                    <q-item-label>{{transactions[0].Value.dateExpired}}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-ripple>
                  <q-item-section>
                    <q-item-label overline>Min Temperature</q-item-label>
                    <q-item-label>{{transactions[0].Value.minTemp}}°C</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item
                  clickable
                  v-ripple>
                  <q-item-section>
                    <q-item-label overline>Max Temperature</q-item-label>
                    <q-item-label>{{transactions[0].Value.maxTemp}}°C</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>
      </div>
	 </section>
    </VueHtml2pdf>
	 <div class="q-px-lg q-pb-md">
   <q-timeline color="secondary" v-if="transactions !== null && transactions.length > 0">
		<div class='text-h4'>
		 Transaction Ledger
		 </div>
          <div>
            <q-timeline-entry
              v-for="(transaction, i) in transactions"

              v-bind:key="transaction.TxId"
              :title="getTitle(i)">
			    <div v-if ="transaction.IsDelete === 'false' ">
			       <div>
                Organization : {{transaction.Value.organization}}
              </div>
              <div>
                TXID: {{transaction.TxId}}
              </div>
              <div>
                Current Temperature: {{transaction.Value.temp}}°C
              </div>
			  </div>
			  <div
				v-if="transactions !== null && transaction.Value.temp >transaction.Value.maxTemp">
				<q-btn
					color="red"
					label="Recall"
					v-on:click="recallBatch"
				/>
			  </div>
            </q-timeline-entry>
          </div>
        </q-timeline>
      </div>
	  <div
        v-if="transactions !== null && transactions.length > 0"
        style="padding: 15px;">
        <div
          class="items-start q-gutter-md"
          style="padding: 5px;">
          <q-card class="my-card">
            <q-card-section>
              <div class="text-h6">
                Product Details
              </div>
            </q-card-section>
            <q-card-section>
              <q-list>
                <q-item
                  clickable
                  v-ripple>
                  <q-item-section>
                    <q-item-label overline>Drug Name</q-item-label>
                    <q-item-label>{{transactions[0].Value.drugName}}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-ripple>
                  <q-item-section>
                    <q-item-label overline>Price</q-item-label>
                    <q-item-label>{{transactions[0].Value.amount}}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-ripple>
                  <q-item-section>
                    <q-item-label overline>Manufactured Date</q-item-label>
                    <q-item-label>{{transactions[0].Value.dateManufactured}}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-ripple>
                  <q-item-section>
                    <q-item-label overline>Expiry Date</q-item-label>
                    <q-item-label>{{transactions[0].Value.dateExpired}}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-ripple>
                  <q-item-section>
                    <q-item-label overline>Min Temperature</q-item-label>
                    <q-item-label>{{transactions[0].Value.minTemp}}°C</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item
                  clickable
                  v-ripple>
                  <q-item-section>
                    <q-item-label overline>Max Temperature</q-item-label>
                    <q-item-label>{{transactions[0].Value.maxTemp}}°C</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'ViewBatch',
    components: {
        VueHtml2pdf
    },
  methods: {
	  capitalized : function(name){
	  const capitalized = name.charAt(0).toUpperCase()+ name.slice(1)
	  console.log(capitalized)
	  return capitalized
  },
    getTitle: function (idx) {
	 if(this.transactions[idx].IsDelete === "false")
      return this.prefixes[idx]
	  else
	  return this.prefixes[4]
    },
	recallBatch: function () {
      this.$axios.delete(`/api/recallBatch?batchId=${this.batchID}`).then((resp) => {
        console.log(resp)
        this.$q.notify({
          message: 'Batch  recalled',
          color: 'red'
        })
      }).catch(err => {
        console.log(err)
        this.$q.notify({
          message: 'Failed to recall batch',
          color: 'red'
        })
      })
    },
    search: function () {
      this.$axios.get(`/api/find?batchId=${this.batchID}`).then((resp) => {
        console.log(resp)
        this.transactions = JSON.parse(resp.data)
        if (this.transactions.length === 0) {
          this.$q.notify({
            message: 'Failed to find batch',
            color: 'red'
          })
        }
      }).catch((err) => {
        console.log(err.response)
        this.$q.notify({
          message: 'Failed to find batch',
          color: 'red'
        })
        this.transactions = []
      })
    },
	 generateReport: function () {
            this.$refs.html2Pdf.generatePdf()
        }
  },
   data () {
    return {
      batchID: '',
      prefixes: ['Manufactured by', 'Supplied by', 'Stored at', 'Pharmacy', 'Batch Recalled'],
      transactions: []
    }
  }
}
import VueHtml2pdf from 'vue-html2pdf'
</script>
