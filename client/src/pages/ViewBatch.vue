<template>
  <q-page class="flex flex-center">
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
		    <div class="col-3">
          <q-btn
            color="primary"
            icon="download"
            label="Report"
            v-on:click="generateReport"/>
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
        pdf-orientation="landscape"
        pdf-content-width="800px"
        ref="html2Pdf">
	 <section slot="pdf-content">
      <div class="q-px-lg q-pb-md">
        <q-timeline color="secondary">
          <q-timeline-entry
            heading
            v-if="transactions !== null && transactions.length > 0">
            Product Ledger
          </q-timeline-entry>
          <div>
            <q-timeline-entry
              v-for="(transaction, i) in transactions"
              v-bind:key="transaction.TxId"
              :title="transaction.Value.organization"
              :subtitle="getTitle(i)">
              <div>
                TXID: {{transaction.TxId}}
              </div>
              <div>
                MinTemp: {{transaction.Value.minTemp}}
              </div>
              <div>
                MaxTemp: {{transaction.Value.maxTemp}}
              </div>
			  <div
				v-if="transactions !== null && transaction.Value.maxTemp > 25">
				<q-btn
					color="red"
					label="Recall"
					v-on:click="recallBatch"/>
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
                    <q-item-label overline>Amount</q-item-label>
                    <q-item-label>{{transactions[0].Value.amount}}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-ripple>
                  <q-item-section>
                    <q-item-label overline>Date Manufactured</q-item-label>
                    <q-item-label>{{transactions[0].Value.dateManufactured}}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-ripple>
                  <q-item-section>
                    <q-item-label overline>Date Expired</q-item-label>
                    <q-item-label>{{transactions[0].Value.dateExpired}}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-ripple>
                  <q-item-section>
                    <q-item-label overline>Min Temperature</q-item-label>
                    <q-item-label>{{transactions[0].Value.minTemp}}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item
                  clickable
                  v-ripple>
                  <q-item-section>
                    <q-item-label overline>Max Temperature</q-item-label>
                    <q-item-label>{{transactions[0].Value.maxTemp}}</q-item-label>
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
        <q-timeline color="secondary">
          <q-timeline-entry
            heading
            v-if="transactions !== null && transactions.length > 0">
            Product Ledger
          </q-timeline-entry>
          <div>
            <q-timeline-entry
              v-for="(transaction, i) in transactions"
              v-bind:key="transaction.TxId"
              :title="transaction.Value.organization"
              :subtitle="getTitle(i)">
              <div>
                TXID: {{transaction.TxId}}
              </div>
              <div>
                MinTemp: {{transaction.Value.minTemp}}
              </div>
              <div>
                MaxTemp: {{transaction.Value.maxTemp}}
              </div>
			  <div
				v-if="transactions !== null && transaction.Value.maxTemp > 25">
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
                    <q-item-label overline>Amount</q-item-label>
                    <q-item-label>{{transactions[0].Value.amount}}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-ripple>
                  <q-item-section>
                    <q-item-label overline>Date Manufactured</q-item-label>
                    <q-item-label>{{transactions[0].Value.dateManufactured}}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-ripple>
                  <q-item-section>
                    <q-item-label overline>Date Expired</q-item-label>
                    <q-item-label>{{transactions[0].Value.dateExpired}}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-ripple>
                  <q-item-section>
                    <q-item-label overline>Min Temperature</q-item-label>
                    <q-item-label>{{transactions[0].Value.minTemp}}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item
                  clickable
                  v-ripple>
                  <q-item-section>
                    <q-item-label overline>Max Temperature</q-item-label>
                    <q-item-label>{{transactions[0].Value.maxTemp}}</q-item-label>
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
    getTitle: function (idx) {
      return this.prefixes[idx]
    },
	transportBatch: function () {
      this.$axios.post(`/api/transportBatch`, {
        rfid: this.rfid,
        organization: this.organization
      }).then((resp) => {
        console.log(resp)
        this.$q.notify({
          message: 'Batch recalled',
          color: 'green'
        })
      }).catch(err => {
        console.log(err)
        this.$q.notify({
          message: 'Failed to recall batch',
          color: 'red'
        })
      })
    },
	recallBatch: function () {
      this.$axios.delete(`/api/deleteBatch?batchId=${this.batchID}`).then((resp) => {
        console.log(resp)
        this.$q.notify({
          message: 'Batch recalled',
          color: 'green'
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
            message: `Failed to find ${this.batchID}`,
            color: 'red'
          })
        }
      }).catch((err) => {
        console.log(err.response)
        this.$q.notify({
          message: `Failed to find ${this.batchID}`,
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
      prefixes: ['Manufactured by', 'Supplied by', 'Stored at', 'Pharmacy'],
      transactions: []
    }
  }
}
import VueHtml2pdf from 'vue-html2pdf'
</script>
