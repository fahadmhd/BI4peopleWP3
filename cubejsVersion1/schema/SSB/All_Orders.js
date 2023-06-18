cube(`All_Orders`, {

sql: `SELECT O_ORDERKEY,
	 O_ORDERSTATUS, O_ORDERDATE, O_TOTALPRICE, O_CUSTKEY,
	  'O_Orders' as row_type
	FROM ${O_Orders.sql()} as O_Orders
	UNION
	SELECT O_ORDERKEY ,
	  O_ORDERSTATUS, O_ORDERDATE, O_TOTALPRICE, O_CUSTKEY,
	  'F_Orders' as  row_type
	FROM ${F_Orders.sql()} as F_Orders
  `,

  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started
  },



  joins: {
      O_Orders: {
        relationship: `belongsTo`,
        sql: `${CUBE}.O_CUSTKEY = ${O_Orders.O_CUSTKEY}`,
      },
      F_Orders: {
	          relationship: `belongsTo`,
	          sql: `${CUBE}.O_CUSTKEY = ${F_Orders.O_CUSTKEY}`,
      },
  },

  measures: {


        fTotalprice: {
			sql: `O_TOTALPRICE`,
			type: `sum`,
			filters: [{ sql: `${CUBE}.row_type = 'F_Orders'` }],

    },
            oTotalprice: {
				sql: `O_TOTALPRICE`,
				type: `sum`,
				filters: [{ sql: `${CUBE}.row_type = 'O_Orders'` }],

    },

    Totalprice: {
	      sql: `${fTotalprice} + ${oTotalprice}`,
	      type: `number`,

    },

  onlineRevenuePercentage: {
      sql: `${fTotalprice} / NULLIF(${fTotalprice} + ${oTotalprice}, 0)`,
      type: `number`,
      format: `percent`,
    },



 count: {
      sql: `oCustkey`,
      type: `count`,
    },
  },

    dimensions: {


      type_Orders: {
        sql: `row_type`,
        type: `string`,
      },

           O_ORDERSTATUS: {
	          sql: `O_ORDERSTATUS`,
	          type: `string`,
      },

           O_ORDERDATE: {
	          sql: `O_ORDERDATE`,
	          type: `time`,
      },


	      oOrderpriority: {
	        sql: `${CUBE}.\`O_ORDERPRIORITY\``,
	        type: `string`
	      },

	      oClerk: {
	        sql: `${CUBE}.\`O_CLERK\``,
	        type: `string`
	      },

	      oComment: {
	        sql: `${CUBE}.\`O_COMMENT\``,
	        type: `string`
	      },


	            oOrderkey: {
	  	        sql: `${CUBE}.\`O_ORDERKEY\``,
	  	        type: `number`
	  	      },

	  	      O_CUSTKEY: {
	  	        sql: `${CUBE}.\`O_CUSTKEY\``,
	  	        type: `number`,
	  	        primaryKey: true,
      }

  },


});
